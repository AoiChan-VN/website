// core/Router.js
export default class Router {
  constructor(routes) {
    this.routes = routes;

    window.addEventListener("popstate", () => {
      this.loadRoute(location.pathname);
    });
  }

  match(path) {
    return this.routes.find(r => r.path === path);
  }

  loadRoute(path) {
    const route = this.match(path) || this.match("/");

    const app = document.querySelector("#app");
    app.innerHTML = "";

    new route.component({ target: app });
  }

  navigate(path) {
    history.pushState(null, null, path);
    this.loadRoute(path);
  }
}
