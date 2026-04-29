import Router from './core/Router.js';
import DashboardPage from './pages/DashboardPage.js';
import Modal from './components/shared/Modal.js';
import { store } from './store/index.js';

// 1. Khởi tạo các thanh phần Global
new Modal(document.querySelector('#modal-root'));

// 2. Khởi tạo Toast Container (Tự re-render khi store.toasts đổi)
const renderToast = () => {
  const root = document.querySelector('#toast-root');
  root.innerHTML = store.state.toasts.map(t => `<div class="toast">${t.msg}</div>`).join('');
};
store.subscribe(renderToast);

// 3. Cấu hình Router
const routes = [
  { path: '/', view: DashboardPage },
  { path: '/plugins', view: DashboardPage } // Copy Dashboard qua cho demo nhanh
];

const router = new Router(routes);
