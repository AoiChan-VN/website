import Component from '../../core/Component.js';

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
    // Sự kiện mở Pop-up cài đặt (Sử dụng Store để điều khiển Modal)
    this.addEvent('click', '.btn-settings', () => {
      import('../../store/index.js').then(({ store }) => {
        store.state.modal = {
          isOpen: true,
          title: 'Cài đặt hệ thống',
          content: '<p>Cấu hình Server Minecraft của bạn tại đây...</p>'
        };
      });
    });
  }
}
 
