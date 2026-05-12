import { Mount }
from "../boot/mount.js";

export const Shortcuts = {

  initialize(){

    window.addEventListener(
      "keydown",
      event => {

        if(
          event.ctrlKey &&
          event.key === "1"
        ){

          Mount.open("profile");

        }

        if(
          event.ctrlKey &&
          event.key === "2"
        ){

          Mount.open("explorer");

        }

      }
    );

  }

}; 
