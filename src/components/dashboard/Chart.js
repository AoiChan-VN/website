import Component from '../../core/Component.js';

export default class Chart extends Component {
  template() {
    const { title, data } = this.$props; // data: [{label, value}]
    const max = Math.max(...data.map(d => d.value), 1);
    
    return `
      <div class="chart-container">
        <h3>${title}</h3>
        <div class="chart-bars">
          ${data.map(d => `
            <div class="bar-wrapper">
              <div class="bar" style="height: ${(d.value / max) * 100}%">
                <span class="tooltip">${d.value}</span>
              </div>
              <span class="bar-label">${d.label}</span>
            </div>
          `).join('')}
        </div>
      </div>`;
  }
}

