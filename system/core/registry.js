export const Registry = {

  data:null,

  async load(){

    const response =
      await fetch(
        "./database/registry.json"
      );

    if(!response.ok){

      throw new Error(
        "registry load failed"
      );

    }

    this.data =
      await response.json();

    console.log(
      "[REGISTRY LOADED]",
      this.data
    );

  },

  get(appId){

    return this.data?.apps?.[appId];

  }

}; 
