// components/project/ProjectCard.js
import Component from "../../core/Component.js";
import store from "../../core/Store.js";

export default class ProjectCard extends Component {
  template() {
    const { id, name, version } = this.props;

    return `
      <div class="card">
        <h3>${name}</h3>
        <p>Version: ${version}</p>
        <button data-action="view" data-id="${id}">
          View
        </button>
      </div>
    `;
  }

  view(e, target) {
    const id = target.dataset.id;
    const plugin = store.state.plugins.find(p => p.id === id);

    store.openModal(`
      <h2>${plugin.name}</h2>
      <p>Version: ${plugin.version}</p>
      <p>Downloads: ${plugin.downloads}</p>
    `);
  }
} 
