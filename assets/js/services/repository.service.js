/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { fetchJSON }
from "../core/fetch.js";

import { validateSchema }
from "../core/schema.js";

const REPOSITORY_FILES = [

  "/data/repositories/nebula-engine.json",

  "/data/repositories/advanced-chat.json"

];

const REQUIRED_FIELDS = [

  "id",
  "name",
  "language",
  "repository"

];

export async function getRepositories() {

  const repositories =
    await Promise.all(

      REPOSITORY_FILES.map(
        loadRepository
      )

    );

  return repositories.filter(Boolean);

}

async function loadRepository(
  path
) {

  try {

    const repository =
      await fetchJSON(path);

    const valid =
      validateSchema(
        repository,
        REQUIRED_FIELDS
      );

    if (!valid) {

      console.warn(
        `Invalid schema: ${path}`
      );

      return null;

    }

    return repository;

  } catch (error) {

    console.error(error);

    return null;

  }

}
