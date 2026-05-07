import { initializeTheme } from "./theme.js";
import { initializeRouter } from "./router.js";
import { initializeCache } from "./cache.js";
import { initializeSEO } from "./seo.js";

export function bootApplication() {

  initializeTheme();

  initializeCache();

  initializeSEO();

  initializeRouter();

  registerServiceWorker();

}

function registerServiceWorker() {

  if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register(
      "/workers/service-worker.js"
    );

  }

} 
