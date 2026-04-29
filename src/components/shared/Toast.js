// components/shared/Toast.js
import Component from "../../core/Component.js";
import store from "../../core/Store.js";

export default class Toast extends Component {
  setup() {
    this.state = store.state.toast;

    store.subscribe("toast", (toast) => {
      this.state = toast;
      this.render();
    });
  }

  template() {
    return `
      <div class="toast-container">
        ${this.state
          .map(
            (t) => `<div class="toast">${t.message}</div>`
          )
          .join("")}
      </div>
    `;
  }
} 
