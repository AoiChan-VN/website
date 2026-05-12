export const PluginRuntime = {

  plugins:new Map(),

  async load(plugin){

    const module =
      await import(
        plugin.entry
      );

    if(module.initialize){

      await module.initialize();

    }

    this.plugins.set(
      plugin.id,
      plugin
    );

  },

  unload(id){

    this.plugins.delete(id);

  }

}; 
