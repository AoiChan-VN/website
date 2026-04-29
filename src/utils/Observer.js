export default class Observer {
  constructor() { this.subscribers = new Set(); }
  subscribe(fn) { this.subscribers.add(fn); }
  unsubscribe(fn) { this.subscribers.delete(fn); }
  notify(data) { this.subscribers.forEach(fn => fn(data)); }
}
