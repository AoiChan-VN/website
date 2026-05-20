importScripts(
    './data/cacheConfig.js'
);

const STATIC_CACHE =
    'portfolio-static-v1';

const DYNAMIC_CACHE =
    'portfolio-dynamic-v1';

const PRECACHE = [
    '/',
    '/index.html',
    '/offline.html',
    '/css/reset.css',
    '/css/base.css',
    '/css/components.css',
    '/src/main.js'
];

self.addEventListener(
    'install',
    (event) => {
        event.waitUntil(
            caches
                .open(STATIC_CACHE)
                .then((cache) => {
                    return cache.addAll(
                        PRECACHE
                    );
                })
        );

        self.skipWaiting();
    }
);

self.addEventListener(
    'activate',
    (event) => {
        event.waitUntil(
            caches.keys().then((keys) => {
                return Promise.all(
                    keys.map((key) => {
                        if (
                            key !== STATIC_CACHE &&
                            key !== DYNAMIC_CACHE
                        ) {
                            return caches.delete(
                                key
                            );
                        }
                    })
                );
            })
        );

        self.clients.claim();
    }
);

self.addEventListener(
    'fetch',
    (event) => {
        event.respondWith(
            caches.match(event.request).then(
                (cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    return fetch(
                        event.request
                    )
                        .then((response) => {
                            return caches
                                .open(
                                    DYNAMIC_CACHE
                                )
                                .then(
                                    (cache) => {
                                        cache.put(
                                            event.request,
                                            response.clone()
                                        );

                                        return response;
                                    }
                                );
                        })
                        .catch(() => {
                            return caches.match(
                                '/offline.html'
                            );
                        });
                }
            )
        );
    }
); 
