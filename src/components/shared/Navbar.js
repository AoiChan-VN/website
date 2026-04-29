import Component from '../../core/Component.js';

export default class Navbar extends Component {
  template() {
    return `
      <nav class="nav-bar">
        <div class="logo">MC-SPA</div>
        <div class="links">
          <a href="/" data-link>Dashboard</a>
          <a href="/plugins" data-link>Plugins</a>
          <a href="/resources" data-link>Resources</a>
        </div>
      </nav>`;
  }
}
