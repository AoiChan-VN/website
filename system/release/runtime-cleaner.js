import { RuntimeCache }
from "./cache.js";

import { MemoryRuntime }
from "./memory.js";

export const RuntimeCleaner = {

  cleanup(){

    RuntimeCache.clear();

    MemoryRuntime.cleanup();

    console.log(
      "[Aoi] Runtime cleaned"
    );

  }

}; 
