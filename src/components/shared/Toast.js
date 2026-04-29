import Component from '../../core/Component.js';
import { globalStore } from '../../store/index.js';

export default class Toast extends Component {
  setup() {
    globalStore.subscribe(() => this.render());
  }

  template() {
    const { toasts } = globalStore.state; // toasts: [{id, message, type}]
    return `
      <div class="toast-container">
        ${toasts.map(toast => `
          <div class="toast toast-${toast.type}" data-id="${toast.id}">
            ${toast.message}
          </div>
        `).join('')}
      </div>
    `;
  }

  mounted() {
    // Tự động xóa toast sau 3 giây
    const { toasts } = globalStore.state;
    if (toasts.length > 0) {
      const lastToast = toasts[toasts.length - 1];
      setTimeout(() => {
        globalStore.state.toasts = globalStore.state.toasts.filter(t => t.id !== lastToast.id);
      }, 3000);
    }
  }
}
 
