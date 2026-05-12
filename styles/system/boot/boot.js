import { Kernel } from "../core/kernel.js";

window.addEventListener(
  "DOMContentLoaded",
  async () => {

    try{

      await Kernel.boot();

    }
    catch(error){

      console.error(
        "[BOOT FAILED]",
        error
      );

    }

  }
); 
