import Component from '../core/Component.js';
import ProjectCard from '../components/project/ProjectCard.js';
import { resourceStore } from '../store/index.js';

export default class ResourcePage extends Component {
  setup() {
    resourceStore.subscribe(() => this.render());
  }

  template() {
    const { packs } = resourceStore.state;
    return `
      <div class="page-container">
        <h1>Resource Pack Manager</h1>
        <div class="resource-grid">
          ${packs.map(pack => `<div class="pack-item" data-id="${pack.id}"></div>`).join('')}
        </div>
      </div>
    `;
  }

  mounted() {
    const { packs } = resourceStore.state;
    this.$target.querySelectorAll('.pack-item').forEach((el, index) => {
      new ProjectCard(el, { item: packs[index], type: 'resource' });
    });
  }
}
