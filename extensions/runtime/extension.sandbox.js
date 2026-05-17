// extensions/runtime/extension.sandbox.js

import { AppEvents } from '../../js/services/app.events.js';

class ExtensionSandbox {

    constructor() {
        this.policies = new Map();
    }

    initialize() {

        this.registerDefaults();

        AppEvents.emit('extension_sandbox:ready');
    }

    registerDefaults() {

        this.policies.set('dom', true);
        this.policies.set('network', false);
        this.policies.set('storage', false);
        this.policies.set('worker', false);
    }

    validate(manifest = {}) {

        const permissions =
            manifest.permissions || [];

        const blocked = permissions.some(
            (permission) => {

                if (!this.policies.has(permission)) {
                    return false;
                }

                return this.policies.get(permission) === false;
            }
        );

        if (blocked) {

            AppEvents.emit(
                'extension_sandbox:blocked',
                {
                    id: manifest.id
                }
            );

            return false;
        }

        AppEvents.emit(
            'extension_sandbox:passed',
            {
                id: manifest.id
            }
        );

        return true;
    }

    setPolicy(name, value) {

        this.policies.set(
            name,
            Boolean(value)
        );
    }

    getPolicies() {

        return Object.fromEntries(
            this.policies.entries()
        );
    }
}

const ExtensionSandboxRuntime =
    new ExtensionSandbox();

export {
    ExtensionSandboxRuntime
}; 
