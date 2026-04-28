import Component from '../../core/Component.js';
import { globalStore } from '../../store/index.js';

export default class Modal extends Component {
  setup() {
    globalStore.subscribe(() => this.render());
  }
  template() {
    const { isOpen, title, content } = globalStore.state.modal;
    if (!isOpen) return '';
    return `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2>${title}</h2>
            <button class="close-btn">&times;</button>
          </div>
          <div class="modal-body">${content}</div>
        </div>
      </div>
    `;
  }
  setEvent() {
    this.addEvent('click', '.close-btn', () => {
      globalStore.state.modal = { ...globalStore.state.modal, isOpen: false };
    });
  }
}
