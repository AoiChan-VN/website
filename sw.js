// sw.js

const CACHE_VERSION = 'aoi-runtime-v1';

const CACHE_ASSETS = [
    '/',
    '/index.html'
];

self.addEventListener('install', (event) => {

    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => cache.addAll(CACHE_ASSETS))
    );

    self.skipWaiting();
});

self.addEventListener('activate', (event) => {

    event.waitUntil(
        caches.keys().then((keys) => {

            return Promise.all(
                keys.map((key) => {

                    if (key === CACHE_VERSION) {
                        return null;
                    }

                    return caches.delete(key);
                })
            );
        })
    );

    self.clients.claim();
});

self.addEventListener('fetch', (event) => {

    event.respondWith(

        caches.match(event.request)
            .then((cached) => {

                if (cached) {
                    return cached;
                }

                return fetch(event.request)
                    .then((response) => {

                        const cloned = response.clone();

                        caches.open(CACHE_VERSION)
                            .then((cache) => {
                                cache.put(event.request, cloned);
                            });

                        return response;
                    });
            })
    );
}); 
