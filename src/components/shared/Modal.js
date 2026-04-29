// components/shared/Modal.js
import Component from "../../core/Component.js";
import store from "../../core/Store.js";

export default class Modal extends Component {
  setup() {
    this.state = store.state.modal;

    store.subscribe("modal", (modal) => {
      this.state = modal;
      this.render();
    });
  }

  template() {
    if (!this.state.visible) return "";

    return `
      <div class="modal-overlay">
        <div class="modal">
          <button data-action="close">✖</button>
          <div class="modal-body">
            ${this.state.content}
          </div>
        </div>
      </div>
    `;
  }

  close() {
    store.state.modal = {
      visible: false,
      content: "",
    };
  }
} 
