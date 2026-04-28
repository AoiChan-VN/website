import Component from '../core/Component.js';
import ProjectCard from '../components/project/ProjectCard.js';
import { pluginStore, globalStore } from '../store/index.js';

export default class PluginPage extends Component {
  setup() {
    pluginStore.subscribe(() => this.render());
  }

  template() {
    const { items, searchQuery } = pluginStore.state;
    // Logic tìm kiếm
    const filteredItems = items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return `
      <div class="page-container">
        <header class="page-header">
          <h1>Plugin Manager</h1>
          <input type="text" class="search-input" placeholder="Tìm plugin..." value="${searchQuery}">
        </header>
        <div class="plugin-list">
          ${filteredItems.map(item => `<div class="card-wrapper" data-item-id="${item.id}"></div>`).join('')}
        </div>
      </div>
    `;
  }

  mounted() {
    // Render các component con (ProjectCard) vào wrapper
    const { items, searchQuery } = pluginStore.state;
    const filteredItems = items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    this.$target.querySelectorAll('.card-wrapper').forEach((wrapper, index) => {
      new ProjectCard(wrapper, { item: filteredItems[index], type: 'plugin' });
    });
  }

  setEvent() {
    // Xử lý tìm kiếm
    this.addEvent('input', '.search-input', (e) => {
      pluginStore.state.searchQuery = e.target.value;
    });

    // Mở Modal xem chi tiết
    this.addEvent('click', '.btn-detail', (e) => {
      const id = e.target.dataset.id;
      const plugin = pluginStore.state.items.find(p => p.id == id);
      
      globalStore.state.modal = {
        isOpen: true,
        title: `Chi tiết: ${plugin.name}`,
        content: `
          <div class="detail-view">
            <p><strong>Phiên bản:</strong> ${plugin.version}</p>
            <p><strong>Trạng thái:</strong> <span class="badge">${plugin.status}</span></p>
            <hr>
            <button class="btn-primary">Kiểm tra cập nhật</button>
          </div>
        `
      };
    });
  }
}
 
