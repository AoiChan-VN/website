const cache = new Map();

export function getCache(key){

    return cache.get(key);
}

export function setCache(key,value){

    if(cache.size > 200){

        const first =
            cache.keys().next().value;

        cache.delete(first);
    }

    cache.set(key,value);

    return value;
}
