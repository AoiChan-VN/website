const JSON_HEADERS = {
  Accept: "application/json"
};

export async function fetchJson(path) {

  const response =
    await fetch(path, {
      method: "GET",
      headers: JSON_HEADERS,
      cache: "no-store"
    });

  if (!response.ok) {

    throw new Error(
      `[${response.status}] ${path}`
    );

  }

  return await response.json();

}
