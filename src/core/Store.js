// core/Store.js
import Observer from "../utils/Observer.js";
import { initialData } from "../store/data.js";

class Store {
  constructor() {
    this.observer = new Observer();

    this.state = new Proxy(
      {
        ...initialData,
        modal: { visible: false, content: "" },
        toast: [],
      },
      {
        set: (target, key, value) => {
          target[key] = value;
          this.observer.notify(key, value);
          return true;
        },
      }
    );
  }

  subscribe(key, cb) {
    this.observer.subscribe(key, cb);
  }

  // 🎯 Actions
  openModal(content) {
    this.state.modal = { visible: true, content };
  }

  closeModal() {
    this.state.modal = { visible: false, content: "" };
  }

  pushToast(message) {
    const id = Date.now();
    this.state.toast = [...this.state.toast, { id, message }];

    setTimeout(() => {
      this.state.toast = this.state.toast.filter(t => t.id !== id);
    }, 3000);
  }
}

export default new Store();
