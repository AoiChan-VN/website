/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { fetchJSON }
from "../core/fetch.js";

import { validateSchema }
from "../core/schema.js";

const PLUGIN_FILES = [

  "/data/plugins/advanced-chat.json",

  "/data/plugins/nebula-core.json"

];

const REQUIRED_FIELDS = [

  "id",
  "slug",
  "name",
  "version",
  "description",
  "thumbnail"

];

export async function getPlugins() {

  const plugins =
    await Promise.all(

      PLUGIN_FILES.map(loadPlugin)

    );

  return plugins.filter(Boolean);

}

export async function getFeaturedPlugins() {

  const plugins =
    await getPlugins();

  return plugins.filter(
    plugin => plugin.featured
  );

}

async function loadPlugin(
  path
) {

  try {

    const plugin =
      await fetchJSON(path);

    const valid =
      validateSchema(
        plugin,
        REQUIRED_FIELDS
      );

    if (!valid) {

      console.warn(
        `Invalid schema: ${path}`
      );

      return null;

    }

    return plugin;

  } catch (error) {

    console.error(error);

    return null;

  }

}
