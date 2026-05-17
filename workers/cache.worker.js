// workers/cache.worker.js

const CacheRuntime = {

    entries: new Map()
};

self.addEventListener('message', (event) => {

    const payload =
        event.data || {};

    switch (payload.type) {

        case 'CACHE_SET':

            setCache(
                payload.key,
                payload.value
            );

            break;

        case 'CACHE_GET':

            getCache(payload.key);

            break;

        case 'CACHE_REMOVE':

            removeCache(payload.key);

            break;

        case 'CACHE_CLEAR':

            clearCache();

            break;

        default:

            self.postMessage({
                type: 'CACHE_UNKNOWN',
                payload
            });
    }
});

function setCache(key, value) {

    if (!key) {
        return;
    }

    CacheRuntime.entries.set(key, {
        value,
        timestamp: Date.now()
    });

    self.postMessage({
        type: 'CACHE_SET_SUCCESS',
        key
    });
}

function getCache(key) {

    const entry =
        CacheRuntime.entries.get(key);

    self.postMessage({
        type: 'CACHE_RESULT',
        key,
        value: entry || null
    });
}

function removeCache(key) {

    CacheRuntime.entries.delete(key);

    self.postMessage({
        type: 'CACHE_REMOVE_SUCCESS',
        key
    });
}

function clearCache() {

    CacheRuntime.entries.clear();

    self.postMessage({
        type: 'CACHE_CLEAR_SUCCESS'
    });
} 
