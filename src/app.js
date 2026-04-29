import Router from './core/Router.js';
import Navbar from './components/shared/Navbar.js';
import DashboardPage from './pages/DashboardPage.js';
import PluginPage from './pages/PluginPage.js';
import ResourcePage from './pages/ResourcePage.js';

// Khởi tạo Navbar cố định ở header
new Navbar(document.querySelector('#nav-root'));

const routes = [
  { path: '/', view: DashboardPage },
  { path: '/plugins', view: PluginPage },
  { path: '/resources', view: ResourcePage }
];

new Router(routes);
