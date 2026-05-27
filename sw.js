const CACHE =
  "aoi-static-v1";

const ASSETS = [

  "./",

  "./index.html",

  "./manifest.webmanifest",

  "./assets/css/main.css",

  "./assets/js/bootstrap.js"

];

self.addEventListener(
  "install",
  (event) => {

    event.waitUntil(

      caches.open(CACHE)
        .then((cache) => {

          return cache.addAll(
            ASSETS
          );

        })

    );

  }
);

self.addEventListener(
  "activate",
  (event) => {

    event.waitUntil(

      caches.keys()
        .then((keys) => {

          return Promise.all(

            keys.map((key) => {

              if (key !== CACHE) {

                return caches.delete(key);

              }

            })

          );

        })

    );

  }
);

self.addEventListener(
  "fetch",
  (event) => {

    event.respondWith(

      caches.match(
        event.request
      )
      .then((cached) => {

        return (
          cached
          || fetch(event.request)
        );

      })

    );

  }
);
