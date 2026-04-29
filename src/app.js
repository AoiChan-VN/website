import Router from './core/Router.js';
import DashboardPage from './pages/DashboardPage.js';

// Định nghĩa các trang ứng với đường dẫn
const routes = [
  { path: '/', component: DashboardPage },
  { path: '/plugins', component: class extends DashboardPage {
      template() { return '<div><h2>Trang Plugins đang xây dựng...</h2><a href="/">Về Dashboard</a></div>'; }
  }},
  { path: '/404', component: class { 
      constructor($t) { $t.innerHTML = '<h1>404 - Không tìm thấy trang</h1>'; } 
  }}
];

// Khởi tạo Router
new Router(routes);
