import { DockRuntime }
from "./dock.js";

import { SpacesRuntime }
from "./spaces.js";

import { AdvancedGestures }
from "./gestures-advanced.js";

export const NativeRuntime = {

  async initialize(){

    SpacesRuntime.create();

    await DockRuntime.initialize();

    AdvancedGestures.initialize();

  }

}; 
