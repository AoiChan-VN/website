import { loadJSON } from './loader.js';

export async function resolveFolderData(folder) {

  const path =
    `./data/${folder}/aoi_plugins.json`;

  return await loadJSON(path);
} 
