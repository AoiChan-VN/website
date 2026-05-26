import { fetchJSON } from "../utils/fetcher.js";
import { validateData } from "../utils/validator.js";

const ROOT_DATA_FILE = "./data/aoi-file.json";

export async function loadDatabase() {

  const folders = await fetchJSON(
    ROOT_DATA_FILE
  );

  const results = [];

  for (const item of folders) {

    if (!item.path) {
      continue;
    }

    const jsonData = await fetchJSON(
      item.path
    );

    validateData(jsonData);

    results.push(...jsonData);

  }

  return results;

} 
