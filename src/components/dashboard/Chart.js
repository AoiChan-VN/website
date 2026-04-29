import Component from '../../core/Component.js';

export default class Chart extends Component {
  template() {
    const { title, data } = this.$props;
    const max = Math.max(...data.map(d => d.value), 1);
    return `
      <div class="chart-box">
        <h3>${title}</h3>
        <div class="bars-container">
          ${data.map(d => `
            <div class="bar-group">
              <div class="bar-value" style="height: ${(d.value / max) * 100}%">
                <span class="tooltip">${d.value}%</span>
              </div>
              <span class="label">${d.label}</span>
            </div>
          `).join('')}
        </div>
      </div>`;
  }
}
