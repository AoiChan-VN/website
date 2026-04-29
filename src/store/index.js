import { createStore } from '../core/Store.js';

export const store = createStore({
  plugins: [],
  resourcePacks: [],
  serverStatus: {
    online: 0,
    ram: '0GB',
    cpu: '0%',
    status: 'Offline'
  },
  modal: {
    isOpen: false,
    title: '',
    content: null // Chứa component hoặc HTML
  }
});
 
