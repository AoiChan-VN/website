import Component from '../../core/Component.js';
import { store, setModal } from '../../store/index.js';

export default class Modal extends Component {
  setup() { store.subscribe(() => this.render()); }
  template() {
    const { isOpen, title, content } = store.state.modal;
    if (!isOpen) return '';
    return `
      <div class="modal-backdrop">
        <div class="modal-box">
          <div class="modal-header"><h3>${title}</h3><button class="close-x">&times;</button></div>
          <div class="modal-body">${content}</div>
        </div>
      </div>`;
  }
  setEvent() {
    this.addEvent('click', '.close-x', () => setModal({ isOpen: false }));
    this.addEvent('click', '.modal-backdrop', (e) => {
      if(e.target.classList.contains('modal-backdrop')) setModal({ isOpen: false });
    });
  }
}
