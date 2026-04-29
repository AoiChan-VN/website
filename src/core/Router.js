// core/Router.js
export default class Router {
  constructor(routes) {
    this.routes = routes;

    window.addEventListener("popstate", () => {
      this.loadRoute(location.pathname);
    });
  }

  pathToRegex(path) {
    return new RegExp(
      "^" + path.replace(/:\w+/g, "([^/]+)") + "$"
    );
  }

  getParams(match) {
    const values = match.result.slice(1);
    const keys = [...match.route.path.matchAll(/:(\w+)/g)].map(
      (r) => r[1]
    );

    return Object.fromEntries(
      keys.map((key, i) => [key, values[i]])
    );
  }

  loadRoute(path) {
    const match = this.routes
      .map((route) => ({
        route,
        result: path.match(this.pathToRegex(route.path)),
      }))
      .find((m) => m.result !== null);

    if (!match) return;

    const params = this.getParams(match);

    const app = document.querySelector("#app");
    app.innerHTML = "";

    new match.route.component({
      target: app,
      props: params,
    });
  }

  navigate(path) {
    history.pushState(null, null, path);
    this.loadRoute(path);
  }
} 
