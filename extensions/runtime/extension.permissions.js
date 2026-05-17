// extensions/runtime/extension.permissions.js

import { AppEvents } from '../../js/services/app.events.js';

class ExtensionPermissions {

    constructor() {
        this.permissions = new Map();
    }

    initialize() {

        AppEvents.emit(
            'extension_permissions:ready'
        );
    }

    register(id, permissions = []) {

        if (!id) {
            return;
        }

        this.permissions.set(
            id,
            new Set(permissions)
        );

        AppEvents.emit(
            'extension_permissions:register',
            {
                id,
                permissions
            }
        );
    }

    has(id, permission) {

        const permissions =
            this.permissions.get(id);

        if (!permissions) {
            return false;
        }

        return permissions.has(permission);
    }

    revoke(id) {

        if (!this.permissions.has(id)) {
            return;
        }

        this.permissions.delete(id);

        AppEvents.emit(
            'extension_permissions:revoke',
            {
                id
            }
        );
    }

    get(id) {

        const permissions =
            this.permissions.get(id);

        if (!permissions) {
            return [];
        }

        return Array.from(permissions);
    }

    getAll() {

        return Object.fromEntries(

            Array.from(
                this.permissions.entries()
            ).map(([id, permissions]) => {

                return [
                    id,
                    Array.from(permissions)
                ];
            })
        );
    }
}

const ExtensionPermissionsRuntime =
    new ExtensionPermissions();

export {
    ExtensionPermissionsRuntime
}; 
