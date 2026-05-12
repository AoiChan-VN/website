export const Registry = {

  data:{
    apps:{}
  },

  async load(){

    const manifests = [

      "./database/apps/explorer.json",
      "./database/apps/packages.json",
      "./database/apps/terminal.json"
    ];

    for(const path of manifests){

      const response =
        await fetch(path);

      const app =
        await response.json();

      this.data.apps[
        app.id
      ] = app;

    }

  },

  get(id){

    return this.data.apps[id];

  }

};
