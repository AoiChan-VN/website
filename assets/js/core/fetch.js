/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

export async function fetchJSON(
  path
) {

  const response =
    await fetch(path);

  if (!response.ok) {

    throw new Error(
      `Failed to fetch: ${path}`
    );

  }

  return response.json();

} 
