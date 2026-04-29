// core/Router.js
export default class Router {
  constructor(routes, options = {}) {
    this.routes = routes;

    this.mode = options.mode || this.detectMode();
    this.base = options.base || this.getBase();

    this.root = document.querySelector("#app");

    // Bind events
    window.addEventListener("popstate", () => this.load());
    window.addEventListener("hashchange", () => this.load());

    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-link]");
      if (!link) return;

      e.preventDefault();
      const href = link.getAttribute("href");
      this.navigate(href);
    });
  }

  // 🔍 Detect environment
  detectMode() {
    if (location.protocol === "file:") return "hash";
    if (location.hostname.includes("github.io")) return "hash";
    return "history";
  }

  // 📦 Base path (GitHub Pages support)
  getBase() {
    const baseTag = document.querySelector("base");
    return baseTag ? baseTag.getAttribute("href") : "/";
  }

  // 🧭 Get current path
  getPath() {
    if (this.mode === "hash") {
      return location.hash.replace("#", "") || "/";
    }

    let path = location.pathname;

    if (this.base !== "/" && path.startsWith(this.base)) {
      path = path.slice(this.base.length - 1);
    }

    return path || "/";
  }

  // 🔄 Match route
  match(path) {
    return this.routes.find((route) => {
      const regex = new RegExp(
        "^" + route.path.replace(/:\w+/g, "([^/]+)") + "$"
      );
      return path.match(regex);
    });
  }

  // 🎯 Extract params
  getParams(route, path) {
    const keys = [...route.path.matchAll(/:(\w+)/g)].map(
      (r) => r[1]
    );

    const values = path.match(
      new RegExp(route.path.replace(/:\w+/g, "([^/]+)"))
    )?.slice(1);

    if (!values) return {};

    return Object.fromEntries(
      keys.map((key, i) => [key, values[i]])
    );
  }

  // 🎨 Highlight active link
  highlight(path) {
    document.querySelectorAll("[data-link]").forEach((a) => {
      const href = a.getAttribute("href");
      a.classList.toggle("active", href === path);
    });
  }

  // 🚀 Load route
  load() {
    const path = this.getPath();

    const route =
      this.match(path) ||
      this.routes.find((r) => r.path === "/");

    if (!route) return;

    const params = this.getParams(route, path);

    // Clear app
    this.root.innerHTML = "";

    // Render page
    new route.component({
      target: this.root,
      props: params,
    });

    this.highlight(path);
  }

  // 🔗 Navigate
  navigate(path) {
    if (this.mode === "hash") {
      location.hash = path;
      return;
    }

    history.pushState(null, null, this.base + path);
    this.load();
  }

  // 🟢 Start router
  start() {
    this.load();
  }
}
