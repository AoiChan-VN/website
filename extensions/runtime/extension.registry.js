// extensions/runtime/extension.registry.js

import { AppEvents } from '../../js/services/app.events.js';

class ExtensionRegistry {

    constructor() {
        this.registry = new Map();
    }

    initialize() {

        AppEvents.emit('extension_registry:ready');
    }

    register(manifest = {}) {

        if (!manifest.id) {
            return false;
        }

        if (this.registry.has(manifest.id)) {
            return false;
        }

        this.registry.set(
            manifest.id,
            {
                ...manifest,
                registeredAt: Date.now()
            }
        );

        AppEvents.emit('extension_registry:register', {
            id: manifest.id
        });

        return true;
    }

    unregister(id) {

        if (!this.registry.has(id)) {
            return;
        }

        this.registry.delete(id);

        AppEvents.emit('extension_registry:unregister', {
            id
        });
    }

    has(id) {

        return this.registry.has(id);
    }

    get(id) {

        return this.registry.get(id) || null;
    }

    getAll() {

        return Array.from(
            this.registry.values()
        );
    }

    clear() {

        this.registry.clear();

        AppEvents.emit('extension_registry:clear');
    }
}

const ExtensionRegistryRuntime =
    new ExtensionRegistry();

export {
    ExtensionRegistryRuntime
}; 
