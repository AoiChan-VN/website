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

// store/index.js
export const globalStore = createStore({
  plugins: [],
  resourcePacks: [],
  serverStatus: { ram: 0, cpu: 0, players: 0 },
  modal: { isOpen: false, title: '', content: null }
});
