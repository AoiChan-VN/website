const CACHE = new Map();

export function hasCache(key) {
  return CACHE.has(key);
}

export function getCache(key) {
  return CACHE.get(key);
}

export function setCache(key, value) {
  CACHE.set(key, value);
} 
