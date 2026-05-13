import { ProcessManager }
from "../core/process.js";

import { Registry }
from "../core/registry.js";

export const RuntimeInspector = {

  snapshot(){

    return {

      timestamp:
        Date.now(),

      processes:
        ProcessManager.all(),

      apps:
        Registry.all()

    };

  }

};
