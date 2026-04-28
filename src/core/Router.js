export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.init();
  }

  init() {
    window.addEventListener('popstate', () => this.routing());
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-link]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
    this.routing();
  }

  navigate(url) {
    history.pushState(null, null, url);
    this.routing();
  }

  routing() {
    const path = window.location.pathname;
    // Xử lý Dynamic Route cơ bản (ví dụ: /plugins/123)
    let match = this.routes.find(r => r.path === path);
    
    if (!match) {
      match = this.routes[0]; // Mặc định về trang đầu
    }

    const $app = document.querySelector('#app');
    new match.view($app);
  }
}
