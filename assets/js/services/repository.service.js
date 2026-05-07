import { repositoriesDatabase }
from "../database/repositories.db.js";

export function getRepositories() {

  return structuredClone(
    repositoriesDatabase
  );

} 
