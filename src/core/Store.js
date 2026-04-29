export const createStore = (initialState) => {
  let state = initialState;
  const observers = [];

  // Đăng ký component muốn lắng nghe thay đổi
  const subscribe = (callback) => observers.push(callback);

  const notify = () => observers.forEach((fn) => fn());

  const proxyState = new Proxy(state, {
    set(target, key, value) {
      target[key] = value;
      notify(); // Thông báo cho UI render lại
      return true;
    },
    get(target, key) {
      return target[key];
    }
  });

  return { state: proxyState, subscribe };
};
