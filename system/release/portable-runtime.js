export const PortableRuntime = {

  metadata(){

    return {

      version:"1.0.0",

      portable:true,

      platform:
        navigator.platform,

      language:
        navigator.language,

      online:
        navigator.onLine
    };

  }

}; 
