import { createStore } from '../core/Store.js';

export const pluginStore = createStore({
  items: [
    { id: 1, name: 'EssentialsX', version: '2.19.0', status: 'Active' },
    { id: 2, name: 'WorldEdit', version: '7.2.0', status: 'Update Available' },
    { id: 3, name: 'LuckPerms', version: '5.4.0', status: 'Active' }
  ],
  searchQuery: ''
});

export const resourceStore = createStore({
  packs: [
    { id: 1, name: 'Faithful 32x', resolution: '32x32', size: '15MB' },
    { id: 2, name: 'PureBDcraft', resolution: '128x128', size: '80MB' }
  ]
});
