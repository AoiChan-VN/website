import Component from '../../core/Component.js';

export default class StatCard extends Component {
  template() {
    const { title, value, icon, color } = this.$props;
    return `
      <div class="stat-card" style="border-left: 4px solid ${color || '#55FF55'}">
        <div class="stat-icon">${icon || '📊'}</div>
        <div class="stat-info">
          <span class="stat-label">${title}</span>
          <h2 class="stat-value">${value}</h2>
        </div>
      </div>`;
  }
}
