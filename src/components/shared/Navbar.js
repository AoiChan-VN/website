// components/shared/Navbar.js
import Component from "../../core/Component.js";

export default class Navbar extends Component {
  template() {
    return `
      <nav>
        <a href="/" data-link>Dashboard</a>
        <a href="/plugins" data-link>Plugins</a>
        <a href="/resources" data-link>Resources</a>
      </nav>
    `;
  }
} 
