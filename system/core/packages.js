import { FileSystem }
from "./filesystem.js";

export const PackageManager = {

  installed:new Map(),

  initialize(){

    const packages =
      FileSystem.packages();

    for(const pkg of packages){

      this.installed.set(
        pkg.id,
        pkg
      );

    }

  },

  install(pkg){

    FileSystem.installPackage(
      pkg
    );

    this.installed.set(
      pkg.id,
      pkg
    );

  },

  uninstall(id){

    const fs =
      FileSystem.read();

    delete fs.packages[id];

    FileSystem.write(fs);

    this.installed.delete(id);

  },

  all(){

    return [
      ...this.installed.values()
    ];

  }

}; 
