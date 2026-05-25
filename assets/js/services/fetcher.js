export async function fetchJSON(path) {

  const response =
    await fetch(path);

  if (!response.ok) {
    throw new Error(
      `Fetch failed: ${path}`
    );
  }

  return response.json();
}

export async function fetchText(path) {

  const response =
    await fetch(path);

  if (!response.ok) {
    throw new Error(
      `Fetch failed: ${path}`
    );
  }

  return response.text();
} 
