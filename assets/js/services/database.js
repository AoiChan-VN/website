import { fetchJSON }
from "./fetch.js";

const ROOT =
  "./data/aoi-tree.json";

function sanitize(value) {

  return String(
    value || ""
  ).trim();

}

function normalize(item) {

  return {

    id:
      sanitize(item.id),

    title:
      sanitize(item.title),

    description:
      sanitize(
        item.description
      ),

    img:
      sanitize(item.img),

    file:
      sanitize(item.file),

    link:
      sanitize(item.link),

    category:
      sanitize(
        item.category
      )

  };

}

export async function loadContent() {

  const folders =
    await fetchJSON(ROOT);

  const result = [];

  for (const folder of folders) {

    if (!folder.path) {
      continue;
    }

    const entries =
      await fetchJSON(
        folder.path
      );

    entries.forEach((entry) => {

      result.push(
        normalize(entry)
      );

    });

  }

  return result;

}
