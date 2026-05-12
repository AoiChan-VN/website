export const PermissionManager = {

  permissions:new Map(),

  grant(app, permission){

    if(
      !this.permissions.has(app)
    ){

      this.permissions.set(
        app,
        new Set()
      );

    }

    this.permissions
      .get(app)
      .add(permission);

  },

  revoke(app, permission){

    this.permissions
      ?.get(app)
      ?.delete(permission);

  },

  has(app, permission){

    return this.permissions
      ?.get(app)
      ?.has(permission);
  }

}; 
