export const IsolationRuntime = {

  scopes:new Map(),

  create(app){

    const scope = {

      app,

      createdAt:Date.now(),

      permissions:new Set(),

      memory:{},

      state:{}

    };

    this.scopes.set(
      app,
      scope
    );

    return scope;

  },

  get(app){

    return this.scopes.get(app);

  },

  destroy(app){

    this.scopes.delete(app);

  }

}; 
