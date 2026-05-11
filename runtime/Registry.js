class Registry {
    #components = new Map();
    #services = new Map();
    registerComponent(name, def) { this.#components.set(name, def); }
    resolveComponent(name) { 
        const comp = this.#components.get(name);
        if (!comp) throw new Error(`Registry: Component ${name} not found`);
        return comp;
    }
    registerService(name, inst) { this.#services.set(name, inst); }
    getService(name) { return this.#services.get(name); }
}
export const registry = new Registry();
