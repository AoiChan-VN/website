import { Storage }
from "../core/storage.js";

export const WallpaperService = {

  key:"wallpaper",

  initialize(){

    const saved =
      Storage.get(
        this.key,
        "./assets/wallpapers/main.webp"
      );

    this.apply(saved);

  },

  apply(path){

    const wallpaper =
      document.querySelector(
        ".desktop-wallpaper"
      );

    if(!wallpaper){
      return;
    }

    wallpaper.style.backgroundImage = `
      linear-gradient(
        rgba(0,0,0,.25),
        rgba(0,0,0,.45)
      ),
      url("${path}")
    `;

    Storage.set(
      this.key,
      path
    );

  }

}; 
