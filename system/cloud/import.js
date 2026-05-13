import { FileSystem }
from "../core/filesystem.js";

export const ImportRuntime = {

  async restore(file){

    const text =
      await file.text();

    const snapshot =
      JSON.parse(text);

    FileSystem.write(
      snapshot.filesystem
    );

    return true;

  }

};
