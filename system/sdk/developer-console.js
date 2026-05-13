import { RuntimeDebugger }
from "./debugger.js";

export const DeveloperConsole = {

  initialize(){

    window.Nova = {

      debug:
        RuntimeDebugger,

      version:
        "1.0.0"

    };

    console.log(
      "[NOVA SDK READY]"
    );

  }

}; 
