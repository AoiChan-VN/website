export async function getJSON(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch: ${path}`
    );
  }

  return response.json();
} 
