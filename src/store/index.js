import { createStore } from '../core/Store.js';

export const store = createStore({
  // Server data
  serverStatus: { ram: 0, cpu: 0, players: 0, status: 'Offline' },
  // Content data
  plugins: [
    { id: 1, name: 'EssentialsX', version: '2.19', desc: 'Core server commands' },
    { id: 2, name: 'LuckPerms', version: '5.4', desc: 'Permissions management' }
  ],
  // UI State
  modal: { isOpen: false, title: '', content: '' },
  toasts: []
});

// Actions giúp gọn code ở page
export const setModal = (payload) => { store.state.modal = { ...store.state.modal, ...payload }; };
export const addToast = (msg) => {
  const id = Date.now();
  store.state.toasts = [...store.state.toasts, { id, msg }];
  setTimeout(() => {
    store.state.toasts = store.state.toasts.filter(t => t.id !== id);
  }, 3000);
};
