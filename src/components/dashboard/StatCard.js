import Component from '../../core/Component.js';

export default class StatCard extends Component {
  template() {
    const { title, value, unit, color } = this.$props;
    return `
      <div class="stat-card" style="border-left: 5px solid ${color}">
        <div class="stat-title">${title}</div>
        <div class="stat-value">
          ${value} <span class="unit">${unit}</span>
        </div>
      </div>
    `;
  }
}
 
