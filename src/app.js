import Router from './core/Router.js';
import DashboardPage from './pages/DashboardPage.js';

// Cấu hình các trang trong ứng dụng
const routes = [
  { path: '/', component: DashboardPage },
  { 
    path: '/plugins', 
    component: class extends DashboardPage {
      template() { 
        return `
          <div id="navbar-container"></div>
          <div class="container">
            <h2>Danh sách Plugins</h2>
            <p>Hệ thống đang cập nhật dữ liệu...</p>
            <a href="#/">← Quay lại Dashboard</a>
          </div>
        `;
      }
      mounted() {
        // Vẫn cần render Navbar cho trang này
        const Navbar = (await import('./components/shared/Navbar.js')).default;
        new Navbar(this.$target.querySelector('#navbar-container'));
      }
    } 
  },
  { 
    path: '/404', 
    component: class {
      constructor($t) { $t.innerHTML = '<div class="container"><h1>404</h1><p>Trang không tồn tại!</p><a href="#/">Về trang chủ</a></div>'; }
    } 
  }
];

// Kích hoạt Router
new Router(routes);
