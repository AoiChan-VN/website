export const CapabilityManager = {

  capabilities:new Map(),

  register(app, capabilities){

    this.capabilities.set(
      app,
      new Set(capabilities)
    );

  },

  has(app, capability){

    return this.capabilities
      ?.get(app)
      ?.has(capability);
  },

  all(app){

    return [
      ...(
        this.capabilities.get(app)
        || []
      )
    ];

  }

};
