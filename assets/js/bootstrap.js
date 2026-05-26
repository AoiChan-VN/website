import { initRouter } from "./router/router.js";
import { initOverlay } from "./modules/overlay.js";
import { initMotion } from "./modules/motion.js";

async function bootstrap() {

  initOverlay();
  initMotion();

  await initRouter();

}

bootstrap();
