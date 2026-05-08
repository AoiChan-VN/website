const memoryCache =
    new Map();

export function setCache(key, value) {

    memoryCache.set(key, value);

}

export function getCache(key) {

    return memoryCache.get(key);

} 
