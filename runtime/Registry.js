/**
 * Registry System: Tránh việc import trực tiếp giữa các module.
 * Quản lý vòng đời và resolve các tài nguyên hệ thống.
 */
class Registry {
    #components = new Map();
    #services = new Map();

    registerComponent(name, definition) {
        if (this.#components.has(name)) throw new Error(`Component ${name} already exists.`);
        this.#components.set(name, definition);
    }

    resolveComponent(name) {
        const component = this.#components.get(name);
        if (!component) throw new Error(`Component ${name} not found in Registry.`);
        return component;
    }

    registerService(name, instance) {
        this.#services.set(name, instance);
    }

    getService(name) {
        return this.#services.get(name);
    }
}

export const registry = new Registry();
 
