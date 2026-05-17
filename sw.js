// sw.js

const CACHE_NAME =
    'aoi-runtime-cache-v1';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/main.js'
];

self.addEventListener(
    'install',
    (event) => {

        event.waitUntil(

            caches.open(CACHE_NAME)
                .then((cache) => {

                    return cache.addAll(
                        STATIC_ASSETS
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

            caches.keys()
                .then((keys) => {

                    return Promise.all(

                        keys.map((key) => {

                            if (
                                key !== CACHE_NAME
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

            caches.match(
                event.request
            ).then((cached) => {

                if (cached) {
                    return cached;
                }

                return fetch(
                    event.request
                ).then((response) => {

                    const cloned =
                        response.clone();

                    caches.open(
                        CACHE_NAME
                    ).then((cache) => {

                        cache.put(
                            event.request,
                            cloned
                        );
                    });

                    return response;
                });
            })
        );
    }
);
