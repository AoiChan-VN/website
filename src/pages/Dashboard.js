import Component from '../core/Component.js';
import { globalStore } from '../store/index.js';

export default class DashboardPage extends Component {
  setup() {
    globalStore.subscribe(() => this.render());
    this.fetchServerData();
  }

  async fetchServerData() {
    // Giả lập gọi API Minecraft Server
    const mockData = { ram: 4.5, cpu: 12, players: 45 };
    globalStore.state.serverStatus = mockData;
  }

  template() {
    const { ram, cpu, players } = globalStore.state.serverStatus;
    return `
      <div class="dashboard">
        <h1>Server Status</h1>
        <div class="stats-grid">
          <div class="stat-card">RAM: ${ram}GB</div>
          <div class="stat-card">CPU: ${cpu}%</div>
          <div class="stat-card">Online: ${players}</div>
        </div>
        <button class="open-settings">Server Settings</button>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.open-settings', () => {
      globalStore.state.modal = {
        isOpen: true,
        title: 'Server Settings',
        content: '<p>Cấu hình RAM tối đa cho Server...</p>'
      };
    });
  }
}
