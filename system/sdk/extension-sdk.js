export const ExtensionSDK = {

  hooks:new Map(),

  on(event, callback){

    if(
      !this.hooks.has(event)
    ){

      this.hooks.set(
        event,
        []
      );

    }

    this.hooks
      .get(event)
      .push(callback);

  },

  emit(event, payload){

    const hooks =
      this.hooks.get(event)
      || [];

    for(
      const hook
      of hooks
    ){

      hook(payload);

    }

  }

};
