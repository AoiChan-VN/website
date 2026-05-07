const CACHE_NAME =
  "aoichan-cache-v1";

const ASSETS = [

  "/",
  "/index.html",
  "/assets/css/app.css",
  "/assets/js/app.js"

];

self.addEventListener(
  "install",
  event => {

    event.waitUntil(

      caches.open(CACHE_NAME)
        .then(cache => {

          return cache.addAll(ASSETS);

        })

    );

  }
);

self.addEventListener(
  "fetch",
  event => {

    event.respondWith(

      caches.match(event.request)
        .then(response => {

          return response || fetch(event.request);

        })

    );

  }
); 
