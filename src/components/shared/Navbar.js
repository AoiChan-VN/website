import Component from '../../core/Component.js';

export default class Navbar extends Component {
  template() {
    return `
      <nav class="main-nav">
        <div class="nav-logo">MC-ADMIN</div>
        <ul class="nav-links">
          <li><a href="/" data-link>Dashboard</a></li>
          <li><a href="/plugins" data-link>Plugins</a></li>
          <li><a href="/resources" data-link>Resources</a></li>
        </ul>
        <div class="server-badge">Server: <span class="status-dot"></span> Online</div>
      </nav>`;
  }
}

