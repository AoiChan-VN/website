const memory =
  new Map();

export function hasCache(key) {

  return memory.has(key);

}

export function getCache(key) {

  return memory.get(key);

}

export function setCache(
  key,
  value
) {

  memory.set(
    key,
    value
  );

} 
