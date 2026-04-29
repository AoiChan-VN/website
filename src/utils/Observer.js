// utils/Observer.js
export default class Observer {
  constructor() {
    this.listeners = {};
  }

  subscribe(key, callback) {
    if (!this.listeners[key]) this.listeners[key] = [];
    this.listeners[key].push(callback);
  }

  notify(key, data) {
    if (!this.listeners[key]) return;
    this.listeners[key].forEach((cb) => cb(data));
  }
} 
