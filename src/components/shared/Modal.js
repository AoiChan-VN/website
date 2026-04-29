import Component from '../../core/Component.js';
import { store } from '../../store/index.js';

export default class Modal extends Component {
  setup() {
    // Đăng ký lắng nghe store để tự render lại khi đóng/mở
    store.subscribe(() => this.render());
  }

  template() {
    const { isOpen, title, content } = store.state.modal;
    if (!isOpen) return ''; // Nếu đóng thì không vẽ gì cả

    return `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2>${title}</h2>
            <button class="close-btn">&times;</button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
        </div>
      </div>
    `;
  }

  setEvent() {
    // Sự kiện đóng modal
    this.addEvent('click', '.close-btn', () => {
      store.state.modal = { ...store.state.modal, isOpen: false };
    });

    this.addEvent('click', '.modal-overlay', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        store.state.modal = { ...store.state.modal, isOpen: false };
      }
    });
  }
}
