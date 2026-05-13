export const Registry = {

  data:{
    apps:{}
  },

  async load(){

    const manifests = [

      "./database/apps/explorer.json",
      "./database/apps/packages.json",
      "./database/apps/terminal.json",
      "./database/apps/wiki.json",
      "./database/apps/cloud.json",
      "./database/apps/devtools.json"
    ];

    for(const path of manifests){

      const response =
        await fetch(path);

      const app =
        await response.json();

      app.capabilities =
        app.capabilities || [];

      this.data.apps[
        app.id
      ] = app;

    }

  },

  get(id){

    return this.data.apps[id];

  },

  all(){

    return Object.values(
      this.data.apps
    );

  }

};
