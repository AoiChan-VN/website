import { loadJSON } from './loader.js';

export async function buildRegistry(tree) {

  const registry = [];

  for (const item of tree) {

    const path =
      `./data/${item.folder}/aoi_plugins.json`;

    const data =
      await loadJSON(path);

    registry.push({
      category: item,
      items: data
    });

  }

  return registry;
} 
