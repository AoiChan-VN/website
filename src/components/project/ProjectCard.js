import Component from '../../core/Component.js';

export default class ProjectCard extends Component {
  template() {
    const { item } = this.$props;
    return `
      <div class="project-card">
        <div class="project-header">
          <img src="https://ui-avatars.com{item.name}" alt="icon">
          <div class="project-title">
            <h4>${item.name}</h4>
            <span class="version-tag">v${item.version}</span>
          </div>
        </div>
        <p class="project-desc">${item.desc || 'No description available for this pack.'}</p>
        <div class="project-footer">
          <button class="btn-manage" data-id="${item.id}">Manage</button>
          <span class="status-text">${item.status || 'Installed'}</span>
        </div>
      </div>`;
  }
}
