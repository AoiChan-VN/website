import { fetchJSON }
from "./fetch.js";

const DATABASE =
  "./data/aoi-tree.json";

let contentCache =
  null;

async function loadCollections() {

  const collections =
    await fetchJSON(
      DATABASE
    );

  const requests =
    collections.map(
      async (entry) => {

        const source =
          await fetchJSON(
            entry.source
          );

        return source.map(
          (item) => ({

            id:
              item.id,

            title:
              item.title
              || item.id,

            category:
              item.category
              || entry.category
              || "POST",

            description:
              item.description
              || "",

            img:
              item.img
              || "./assets/images/fallback.webp",

            file:
              item.file
              || "",

            link:
              item.link
              || ""

          })
        );

      }
    );

  const result =
    await Promise.all(
      requests
    );

  return result.flat();

}

export async function loadContent() {

  if (contentCache) {

    return contentCache;

  }

  contentCache =
    await loadCollections();

  return contentCache;

}
