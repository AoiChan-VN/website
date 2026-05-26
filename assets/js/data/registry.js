import { fetchJSON }
from "../utils/fetch.js";

export async function loadRegistry(path){

  const registry =
    await fetchJSON(path);

  const allItems = [];

  for(const entry of registry){

    const data =
      await fetchJSON(entry.path);

    allItems.push(...data);
  }

  return allItems;
} 
