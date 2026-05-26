const ROOT_FILE =
  "./data/aoi-file.json";

async function getJSON(path) {

  const response =
    await fetch(path);

  if (!response.ok) {

    throw new Error(
      `[DATABASE] ${path}`
    );

  }

  return response.json();

}

function sanitize(item) {

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

export async function loadContent() {

  const folders =
    await getJSON(ROOT_FILE);

  const results = [];

  for (const folder of folders) {

    if (!folder.path) {
      continue;
    }

    const entries =
      await getJSON(folder.path);

    entries.forEach((entry) => {

      results.push(
        sanitize(entry)
      );

    });

  }

  return results;

} 
