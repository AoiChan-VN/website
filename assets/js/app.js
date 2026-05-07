/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { initializeRouter }
from "./core/router.js";

import { initializeTheme }
from "./core/theme.js";

import { initializeSEO }
from "./core/seo.js";

import { preloadAssets }
from "./core/preloader.js";

import { initializeCache }
from "./core/cache.js";

async function bootstrap() {

  initializeTheme();

  initializeSEO();

  initializeCache();

  preloadAssets();

  initializeRouter();

}

bootstrap();
