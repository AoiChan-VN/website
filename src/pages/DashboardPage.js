import Component from '../core/Component.js';
import Navbar from '../components/shared/Navbar.js';
import StatCard from '../components/dashboard/StatCard.js';
import Modal from '../components/shared/Modal.js';
import { store } from '../store/index.js';

export default class DashboardPage extends Component {
  setup() {
    // Đăng ký render lại trang khi dữ liệu server trong store thay đổi
    store.subscribe(() => this.render());
    
    // Giả lập cập nhật thông số server sau mỗi 3 giây
    if (!window.statusInterval) {
      window.statusInterval = setInterval(() => {
        store.state.serverStatus = {
          online: Math.floor(Math.random() * 100),
          ram: (Math.random() * 8 + 2).toFixed(1) + 'GB',
          cpu: Math.floor(Math.random() * 100) + '%',
          status: 'Running'
        };
      }, 3000);
    }
  }

  template() {
    const { online, ram, cpu, status } = store.state.serverStatus;
    return `
      <div id="navbar-container"></div>
      <div class="container">
        <h1>Server Dashboard</h1>
        <p>Trạng thái: <span style="color: var(--primary-color)">${status}</span></p>
        
        <div class="dashboard-grid">
          <div id="stat-online"></div>
          <div id="stat-ram"></div>
          <div id="stat-cpu"></div>
        </div>
      </div>
      <div id="modal-container"></div>
    `;
  }

  mounted() {
    const { online, ram, cpu } = store.state.serverStatus;
    
    // Render các component con vào các vị trí đã định sẵn
    new Navbar(this.$target.querySelector('#navbar-container'));
    new Modal(this.$target.querySelector('#modal-container'));
    
    new StatCard(this.$target.querySelector('#stat-online'), { 
      title: 'Người chơi', value: online, unit: 'Online', color: '#2ecc71' 
    });
    new StatCard(this.$target.querySelector('#stat-ram'), { 
      title: 'Sử dụng RAM', value: ram, unit: '', color: '#3498db' 
    });
    new StatCard(this.$target.querySelector('#stat-cpu'), { 
      title: 'Tải CPU', value: cpu, unit: '', color: '#e74c3c' 
    });
  }
}
 
