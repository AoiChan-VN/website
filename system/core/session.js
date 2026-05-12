import { Storage }
from "./storage.js";

export const Session = {

  key:"runtime-session",

  save(windows=[]){

    Storage.set(
      this.key,
      windows
    );

  },

  load(){

    return Storage.get(
      this.key,
      []
    );

  }

}; 
