export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.$app = document.querySelector('#app');
    this.init();
  }

  init() {
    // Lắng nghe sự kiện tiến/lùi trang của trình duyệt
    window.addEventListener('popstate', () => this.route());
    
    // Gắn sự kiện click toàn cục để chặn load trang khi bấm thẻ <a>
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.getAttribute('href').startsWith('/')) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });

    this.route();
  }

  navigate(url) {
    window.history.pushState(null, null, url);
    this.route();
  }

  route() {
    const path = window.location.pathname;
    const route = this.routes.find(r => r.path === path) || this.routes.find(r => r.path === '/404');
    
    // Khởi tạo Component tương ứng với đường dẫn
    new route.component(this.$app);
  }
}
 
