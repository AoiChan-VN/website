export const createStore = (initialState) => {
  const observers = new Set();
  const state = new Proxy(initialState, {
    set(target, key, value) {
      target[key] = value;
      observers.forEach((fn) => fn());
      return true;
    }
  });
  const subscribe = (fn) => observers.add(fn);
  return { state, subscribe };
};
