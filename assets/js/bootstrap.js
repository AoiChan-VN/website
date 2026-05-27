import { initRouter }
from "./router/router.js";

import { initOverlay }
from "./modules/overlay.js";

import { initMotion }
from "./modules/motion.js";

import { initBackgroundFX }
from "./modules/background.js";

import { initScrollEffects }
from "./modules/scroll.js";

import { initPWA }
from "./modules/pwa.js";

async function bootstrap() {

  initOverlay();

  initMotion();

  initBackgroundFX();

  initScrollEffects();

  initPWA();

  await initRouter();

}

bootstrap();
