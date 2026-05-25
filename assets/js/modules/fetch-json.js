export async function fetchJson(path) {

  const response =
    await fetch(path, {
      cache: "no-store"
    });

  if (!response.ok) {

    throw new Error(
      `Failed to fetch: ${path}`
    );

  }

  return await response.json();

}
