import { BootProfiler }
from "./boot-profiler.js";

import { AssetRuntime }
from "./assets.js";

import { RuntimeOptimizer }
from "./optimize.js";

export const ReleaseRuntime = {

  async initialize(){

    BootProfiler.begin();

    AssetRuntime.preload([

      "./assets/wallpapers/default.webp",

      "./assets/icons/explorer.png",

      "./assets/icons/wiki.png"

    ]);

    RuntimeOptimizer.idle(
      () => {

        console.log(
          "[Aoi] Idle optimization ready"
        );

      }
    );

    const boot =
      BootProfiler.end();

    console.log(
      `[BOOT] ${boot.toFixed(2)}ms`
    );

  }

}; 
