/**
 * ModuleLoader: Nạp các ESModules từ nguồn bên ngoài (CDN/Github Pages).
 * Sử dụng Dynamic Import của trình duyệt.
 */
export class ModuleLoader {
    static async loadRemote(url) {
        try {
            const module = await import(url);
            if (!module.default) {
                throw new Error(`Module at ${url} does not export a default class.`);
            }
            return module.default;
        } catch (error) {
            console.error(`[ModuleLoader] Failed to load: ${url}`, error);
            return null;
        }
    }

    static async registerExternalApp(registry, config) {
        const AppClass = await this.loadRemote(config.url);
        if (AppClass) {
            registry.registerComponent(config.id, AppClass);
            console.info(`[ModuleLoader] Registered remote app: ${config.id}`);
        }
    }
}
 
