export async function fetchJSON(path) {

  const response = await fetch(path);

  if (!response.ok) {

    throw new Error(
      `[FETCH-ERROR] ${path}`
    );

  }

  return await response.json();

} 
