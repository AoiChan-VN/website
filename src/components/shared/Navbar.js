import Component from '../../core/Component.js';
import { store } from '../../store/index.js';

export default class Navbar extends Component {
  template() {
    return `
      <nav>
        <div class="logo">MC Server Manager</div>
        <div class="menu">
          <a href="#/">Dashboard</a>
          <a href="#/plugins">Plugins</a>
          <a href="#/resources">Resources</a>
          <button class="btn btn-settings" style="margin-left: 20px;">Cài đặt</button>
        </div>
      </nav>
    `;
  }

  setEvent() {
    this.addEvent('click', '.btn-settings', () => {
      store.state.modal = {
        isOpen: true,
        title: 'Cài đặt hệ thống',
        content: '<p>Đây là bảng cài đặt Minecraft Server của bạn.</p>'
      };
    });
  }
}
