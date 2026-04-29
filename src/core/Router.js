export default class Router {
  constructor(routes) {
    this.routes = routes;
    this._init();
  }
  _init() {
    // Lắng nghe thay đổi hashtag trên URL
    window.addEventListener('hashchange', () => this.routing());
    window.addEventListener('load', () => this.routing());

    document.addEventListener('click', e => {
      const link = e.target.closest('a[data-link]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        // Chuyển hướng bằng hash: /plugins -> #/plugins
        location.hash = href; 
      }
    });
  }
  routing() {
    // Lấy path từ hash, mặc định là '/'
    const hashPath = location.hash.replace('#', '') || '/';
    const match = this.routes.find(r => r.path === hashPath) || this.routes[0];
    
    const $app = document.querySelector('#app');
    $app.innerHTML = ''; // Clear để render trang mới
    new match.view($app);
  }
}
