import { Fetcher }
from "../utils/fetcher.js";

export const VFS = {

  async directory(path){

    return await Fetcher.json(path);

  },

  async document(path){

    return await Fetcher.text(path);

  }

}; 
