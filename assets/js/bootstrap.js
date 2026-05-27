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

async function bootstrap() {

  initOverlay();

  initMotion();

  initBackgroundFX();

  initScrollEffects();

  await initRouter();

}

bootstrap();
