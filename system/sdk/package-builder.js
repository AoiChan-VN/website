import { NovaSDK }
from "./sdk.js";

export const PackageBuilder = {

  build({
    id,
    title,
    icon,
    entry,
    files
  }){

    const manifest =
      NovaSDK.createManifest({

        id,
        title,
        icon,
        entry

      });

    return NovaSDK.createPackage({

      manifest,

      files

    });

  }

}; 
