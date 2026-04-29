// core/Router.js
export default class Router {
  constructor(routes, options = {}) {
    this.routes = routes;

    this.mode = options.mode || this.detectMode();
    this.base = options.base || this.getBase();

    window.addEventListener("popstate", () => this.load());
    window.addEventListener("hashchange", () => this.load());
  }

  // 🔍 Auto detect environment
  detectMode() {
    if (location.protocol === "file:") return "hash";
    if (location.hostname.includes("github.io")) return "hash";
    return "history";
  }

  // 📦 Base path (for GitHub Pages)
  getBase() {
    const baseTag = document.querySelector("base");
    return baseTag ? baseTag.getAttribute("href") : "/";
  }

  // 🧭 Get current path
  getPath() {
    if (this.mode === "hash") {
      return location.hash.slice(1) || "/";
    }

    let path = location.pathname;

    // remove base
    if (this.base !== "/" && path.startsWith(this.base)) {
      path = path.replace(this.base, "") || "/";
    }

    return path;
  }

  // 🔄 Match dynamic route
  match(path) {
    return this.routes.find(route => {
      const regex = new RegExp(
        "^" + route.path.replace(/:\w+/g, "([^/]+)") + "$"
      );
      return path.match(regex);
    });
  }

  // 🎯 Extract params
  getParams(route, path) {
    const keys = [...route.path.matchAll(/:(\w+)/g)].map(r => r[1]);
    const values = path.match(
      new RegExp(route.path.replace(/:\w+/g, "([^/]+)"))
    )?.slice(1);

    if (!values) return {};

    return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
  }

  // 🚀 Load route
  load() {
    const path = this.getPath();
    const route = this.match(path) || this.routes[0];

    const params = this.getParams(route, path);

    const app = document.querySelector("#app");
    app.innerHTML = "";

    new route.component({
      target: app,
      props: params,
    });
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
  }
