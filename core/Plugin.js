/**
 * Plugin Base: Mọi plugin phải tuân thủ interface này.
 */
export class Plugin {
    constructor(name) {
        this.name = name;
    }

    // Được gọi khi Kernel khởi tạo plugin
    install(kernel, registry) {
        throw new Error(`Plugin ${this.name} must implement install method.`);
    }
}

export class PluginLoader {
    static async load(kernel, registry, plugins = []) {
        for (const PluginClass of plugins) {
            const instance = new PluginClass();
            console.info(`[PluginSystem] Installing: ${instance.name}`);
            await instance.install(kernel, registry);
        }
    }
}
 
