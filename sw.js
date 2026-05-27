const CACHE =
  "aoi-static-v1";

const ASSETS = [

  "./",

  "./index.html",

  "./aoi.webmanifest",

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
