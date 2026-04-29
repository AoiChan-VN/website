import Component from '../core/Component.js';
import StatCard from '../components/dashboard/StatCard.js';
import Chart from '../components/dashboard/Chart.js';
import { globalStore } from '../store/index.js';

export default class DashboardPage extends Component {
  setup() {
    globalStore.subscribe(() => this.render());
  }
  template() {
    return `
      <div class="dashboard-container">
        <h1>Server Dashboard</h1>
        <div class="stats-row">
          <div id="ram-card"></div>
          <div id="cpu-card"></div>
        </div>
        <div id="server-chart"></div>
      </div>`;
  }
  mounted() {
    const { ram, cpu } = globalStore.state.serverStatus;
    // Render StatCards
    new StatCard(this.$target.querySelector('#ram-card'), { title: 'RAM', value: `${ram}GB`, icon: '💾' });
    new StatCard(this.$target.querySelector('#cpu-card'), { title: 'CPU', value: `${cpu}%`, icon: '⚡' });
    
    // Render Chart mẫu
    new Chart(this.$target.querySelector('#server-chart'), {
      title: 'Performance History',
      data: [
        { label: '10am', value: 40 }, { label: '11am', value: 85 }, { label: '12pm', value: 60 }
      ]
    });
  }
}
