// core/Store.js
import Observer from "../utils/Observer.js";

class Store {
  constructor(initialState = {}) {
    this.observer = new Observer();

    this.state = new Proxy(initialState, {
      set: (target, key, value) => {
        target[key] = value;
        this.observer.notify(key, value);
        return true;
      },
    });
  }

  subscribe(key, callback) {
    this.observer.subscribe(key, callback);
  }
}

export default new Store({
  plugins: [],
  resourcePacks: [],
  serverStatus: {
    cpu: 0,
    ram: 0,
    players: 0,
  },
  modal: {
    visible: false,
    content: "",
  },
}); 
