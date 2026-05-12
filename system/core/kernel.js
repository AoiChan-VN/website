import { Registry } from "./registry.js";
import { Runtime } from "./runtime.js";

export const Kernel = {

  async boot(){

    console.log(
      "[KERNEL] boot sequence start"
    );

    await Registry.load();

    Runtime.initialize();

    this.completeBoot();

  },

  completeBoot(){

    const bootScreen =
      document.getElementById(
        "boot-screen"
      );

    if(!bootScreen){
      return;
    }

    bootScreen.animate(
      [
        {
          opacity:1
        },
        {
          opacity:0
        }
      ],
      {
        duration:600,
        easing:"ease"
      }
    );

    setTimeout(
      () => {

        bootScreen.remove();

      },
      620
    );

  }

}; 
