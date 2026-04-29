export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.$app = document.querySelector('#app');
    this.init();
  }

  init() {
    // Lắng nghe sự kiện thay đổi Hash (#)
    window.addEventListener('hashchange', () => this.route());
    window.addEventListener('load', () => this.route());
    this.route();
  }

  navigate(url) {
    window.location.hash = url; // Điều hướng bằng hash
  }

  route() {
    // Lấy path sau dấu #, nếu không có thì mặc định là /
    const path = window.location.hash.replace('#', '') || '/';
    const route = this.routes.find(r => r.path === path) || this.routes.find(r => r.path === '/404');
    
    this.$app.innerHTML = ''; // Clear trước khi render trang mới
    new route.component(this.$app);
  }
}
