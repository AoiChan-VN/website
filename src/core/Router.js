export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.$app = document.querySelector('#app');
    this.init();
  }

  init() {
    // Theo dõi sự kiện thay đổi hashtag trên thanh địa chỉ
    window.addEventListener('hashchange', () => this.route());
    // Chạy lần đầu khi trang vừa load
    window.addEventListener('load', () => this.route());
  }

  // Hàm điều hướng thủ công bằng code
  navigate(url) {
    window.location.hash = url;
  }

  route() {
    // Lấy phần đường dẫn sau dấu # (ví dụ: #/plugins -> /plugins)
    const path = window.location.hash.slice(1) || '/';
    const route = this.routes.find(r => r.path === path) || this.routes.find(r => r.path === '/404');
    
    // Xóa nội dung cũ để render trang mới
    this.$app.innerHTML = '';
    new route.component(this.$app);
  }
}
