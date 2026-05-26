import { loadDatabase } from "./loader.js";
import { renderCards } from "./renderer.js";

import { initParallax } from "../modules/parallax.js";
import { initPanel } from "../modules/panel.js";
import { initEffects } from "../modules/effects.js";

async function bootstrap() {

  try {

    initParallax();
    initPanel();
    initEffects();

    const database = await loadDatabase();

    renderCards(database);

  } catch (error) {

    console.error(
      "[AOI-BOOTSTRAP-ERROR]",
      error
    );

  }

}

bootstrap(); 
