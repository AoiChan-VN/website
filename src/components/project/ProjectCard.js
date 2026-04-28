import Component from '../../core/Component.js';
import { globalStore } from '../../store/index.js';

export default class ProjectCard extends Component {
  template() {
    const { item, type } = this.$props;
    return `
      <div class="card" data-id="${item.id}">
        <div class="card-info">
          <h3>${item.name}</h3>
          <p>${type === 'plugin' ? `Version: ${item.version}` : `Res: ${item.resolution}`}</p>
        </div>
        <div class="card-actions">
          <button class="btn-detail" data-id="${item.id}">Chi tiết</button>
          <button class="btn-delete" data-id="${item.id}">Xóa</button>
        </div>
      </div>
    `;
  }
}
