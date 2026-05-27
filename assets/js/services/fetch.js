import {
  hasCache,
  getCache,
  setCache
}
from "./cache.js";

const TIMEOUT =
  12000;

async function fetchWithTimeout(
  path
) {

  const controller =
    new AbortController();

  const timer =
    setTimeout(
      () => {

        controller.abort();

      },
      TIMEOUT
    );

  try {

    const response =
      await fetch(path, {
        method: "GET",
        cache: "force-cache",
        signal:
          controller.signal
      });

    clearTimeout(timer);

    return response;

  } catch (error) {

    clearTimeout(timer);

    throw error;

  }

}

export async function fetchJSON(
  path
) {

  if (hasCache(path)) {

    return getCache(path);

  }

  const response =
    await fetchWithTimeout(
      path
    );

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

export async function fetchText(
  path
) {

  if (hasCache(path)) {

    return getCache(path);

  }

  const response =
    await fetchWithTimeout(
      path
    );

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
