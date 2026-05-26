const DATABASE_FILE =
  "./data/aoi-file.json";

async function getJSON(path) {

  const response =
    await fetch(path);

  if (!response.ok) {

    throw new Error(
      `[FETCH] ${path}`
    );

  }

  return response.json();

}

function normalizeItem(item) {

  return {

    id:
      String(item.id || "UNKNOWN"),

    description:
      String(item.description || ""),

    img:
      String(item.img || ""),

    file:
      String(item.file || ""),

    link:
      String(item.link || "")

  };

}

export async function loadDatabase() {

  const root =
    await getJSON(DATABASE_FILE);

  const result = [];

  for (const folder of root) {

    if (!folder.path) {
      continue;
    }

    const items =
      await getJSON(folder.path);

    items.forEach((item) => {

      result.push(
        normalizeItem(item)
      );

    });

  }

  return result;

} 
