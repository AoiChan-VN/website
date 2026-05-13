import { AdvancedCompositor }
from "./compositor-advanced.js";

import { BlurPipeline }
from "./blur.js";

export const WindowEffects = {

  initialize(win){

    BlurPipeline.apply(win);

    AdvancedCompositor
      .cinematicOpen(win);

    win.addEventListener(
      "mouseenter",
      () => {

        AdvancedCompositor
          .elevate(win);

      }
    );

    win.addEventListener(
      "mouseleave",
      () => {

        AdvancedCompositor
          .normalize(win);

      }
    );

  }

}; 
