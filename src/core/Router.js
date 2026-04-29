export default class Router {
  constructor(routes) {
    this.routes = routes;
    this._init();
  }

  _init() {
    window.addEventListener('popstate', () => this.routing());
    document.addEventListener('click', e => {
      const target = e.target.closest('a[data-link]');
      if (target) {
        e.preventDefault();
        history.pushState(null, null, target.href);
        this.routing();
      }
    });
    this.routing();
  }

  routing() {
    const path = window.location.pathname;
    const match = this.routes.find(route => route.path === path) || this.routes[0];
    const $app = document.querySelector('#app');
    new match.view($app);
  }
}
