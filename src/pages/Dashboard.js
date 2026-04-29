import Component from '../core/Component.js';
import { store, setModal, addToast } from '../store/index.js';

export default class DashboardPage extends Component {
  setup() {
    store.subscribe(() => this.render());
    // Giả lập lấy data từ API mỗi 2 giây
    if (!window.dashInterval) {
      window.dashInterval = setInterval(() => {
        store.state.serverStatus = {
          ram: (Math.random() * 8).toFixed(1),
          cpu: Math.floor(Math.random() * 100),
          players: Math.floor(Math.random() * 50),
          status: 'Online'
        };
      }, 2000);
    }
  }
  template() {
    const { ram, cpu, players, status } = store.state.serverStatus;
    return `
      <div class="dashboard-page">
        <h1>Server Console</h1>
        <div class="status-badge ${status.toLowerCase()}">${status}</div>
        <div class="grid">
          <div class="card"><h4>RAM</h4><p>${ram} GB / 8GB</p></div>
          <div class="card"><h4>CPU</h4><p>${cpu}%</p></div>
          <div class="card"><h4>PLAYERS</h4><p>${players}/100</p></div>
        </div>
        <button class="btn-config">Open Quick Config</button>
      </div>`;
  }
  setEvent() {
    this.addEvent('click', '.btn-config', () => {
      setModal({ 
        isOpen: true, 
        title: 'Quick Config', 
        content: '<input type="text" placeholder="Server Name..."><button id="save">Save</button>' 
      });
    });
    this.addEvent('click', '#save', () => {
      addToast('Configuration Saved!');
      setModal({ isOpen: false });
    });
  }
}
