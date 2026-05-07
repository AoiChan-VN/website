import { pluginsDatabase }
from "../database/plugins.db.js";

export function getPlugins() {

  return structuredClone(
    pluginsDatabase
  );

}

export function getFeaturedPlugins() {

  return pluginsDatabase.filter(
    plugin => plugin.featured
  );

}

export function findPluginBySlug(
  slug
) {

  return pluginsDatabase.find(
    plugin => plugin.slug === slug
  );

} 
