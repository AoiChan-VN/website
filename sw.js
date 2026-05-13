const CACHE =
  "aoi-runtime-v1";

const ASSETS = [

  "./",
  "./index.html",
  "./manifest.webmanifest",

  "./styles/system/motion.css",
  "./styles/system/dock.css",
  "./styles/system/security.css",

  "./database/apps/explorer.json",
  "./database/apps/wiki.json",
  "./database/apps/cloud.json"
];

self.addEventListener(
  "install",
  event => {

    event.waitUntil(

      caches.open(CACHE)
        .then(
          cache =>
            cache.addAll(ASSETS)
        )

    );

  }
);

self.addEventListener(
  "fetch",
  event => {

    event.respondWith(

      caches.match(
        event.request
      ).then(
        response => {

          return (
            response
            || fetch(event.request)
          );

        }
      )

    );

  }
); 
