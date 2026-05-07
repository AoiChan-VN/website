/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

const CACHE_PREFIX =
  "aoichan-cache";

export function initializeCache() {

  cleanupExpiredCache();

}

export function setCache(
  key,
  value,
  ttl = 3600000
) {

  const payload = {

    value,

    expires:
      Date.now() + ttl

  };

  localStorage.setItem(
    `${CACHE_PREFIX}:${key}`,
    JSON.stringify(payload)
  );

}

export function getCache(key) {

  const raw =
    localStorage.getItem(
      `${CACHE_PREFIX}:${key}`
    );

  if (!raw) {
    return null;
  }

  try {

    const payload =
      JSON.parse(raw);

    if (
      Date.now() > payload.expires
    ) {

      localStorage.removeItem(
        `${CACHE_PREFIX}:${key}`
      );

      return null;

    }

    return payload.value;

  } catch {

    return null;

  }

}

function cleanupExpiredCache() {

  Object.keys(localStorage)
    .forEach(key => {

      if (
        !key.startsWith(CACHE_PREFIX)
      ) {
        return;
      }

      getCache(
        key.replace(
          `${CACHE_PREFIX}:`,
          ""
        )
      );

    });

} 
