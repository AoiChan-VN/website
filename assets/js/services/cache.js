const storage =
  new Map();

export function hasCache(
  key
) {

  return storage.has(key);

}

export function getCache(
  key
) {

  return storage.get(key);

}

export function setCache(
  key,
  value
) {

  storage.set(
    key,
    value
  );

}
