import { Storage }
from "../core/storage.js";

export const ThemeService = {

  key:"theme-mode",

  initialize(){

    const saved =
      Storage.get(
        this.key,
        "dark"
      );

    this.apply(saved);

  },

  apply(mode){

    document.body.dataset.theme =
      mode;

    Storage.set(
      this.key,
      mode
    );

  }

}; 
