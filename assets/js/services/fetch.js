import {
  hasCache,
  getCache,
  setCache
}
from "./cache.js";

export async function fetchJSON(path) {

  if (hasCache(path)) {

    return getCache(path);

  }

  const response =
    await fetch(path, {
      method: "GET",
      cache: "force-cache"
    });

  if (!response.ok) {

    throw new Error(
      `[FETCH-JSON] ${path}`
    );

  }

  const data =
    await response.json();

  setCache(path, data);

  return data;

}

export async function fetchText(path) {

  if (hasCache(path)) {

    return getCache(path);

  }

  const response =
    await fetch(path, {
      method: "GET",
      cache: "force-cache"
    });

  if (!response.ok) {

    throw new Error(
      `[FETCH-TEXT] ${path}`
    );

  }

  const text =
    await response.text();

  setCache(path, text);

  return text;

} 
