export class ModuleLoader {
    static async loadRemote(url) {
        try {
            const module = await import(url);
            return module.default || module;
        } catch (e) {
            console.error(`Failed to load module: ${url}`, e);
            return null;
        }
    }

    static async registerExternalApp(registry, config) {
        const AppClass = await this.loadRemote(config.url);
        if (AppClass) registry.registerComponent(config.id, AppClass);
    }
}
