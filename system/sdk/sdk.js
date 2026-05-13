export const NovaSDK = {

  createManifest({

    id,
    title,
    icon,
    entry,
    capabilities=[]

  }){

    return {

      id,

      title,

      icon,

      entry,

      capabilities,

      signature:
        `nova:${id}:trusted`

    };

  },

  createPackage({

    manifest,
    files
  }){

    return {

      version:1,

      manifest,

      files,

      createdAt:Date.now()

    };

  }

}; 
