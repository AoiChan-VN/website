import { FileSystem }
from "../core/filesystem.js";

export const BackupRuntime = {

  create(){

    return {

      createdAt:Date.now(),

      filesystem:
        FileSystem.read()

    };

  }

}; 
