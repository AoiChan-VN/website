import Router from './core/Router.js';
import DashboardPage from './pages/DashboardPage.js';
import PluginPage from './pages/PluginPage.js';
import Modal from './components/shared/Modal.js';

// Khởi tạo Modal toàn cục
new Modal(document.querySelector('#modal-root'));

// Cấu hình Route
const routes = [
  { path: '/', view: DashboardPage },
  { path: '/plugins', view: PluginPage }
];

new Router(routes);
