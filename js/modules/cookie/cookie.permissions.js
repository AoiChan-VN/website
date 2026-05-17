// js/modules/cookie/cookie.permissions.js

import { AppEvents } from '../../services/app.events.js';

class CookiePermissions {

    constructor() {
        this.rules = {
            read: true,
            write: true,
            sessionOnly: false
        };
    }

    initialize() {

        AppEvents.emit(
            'cookie_permissions:ready'
        );
    }

    canRead() {

        return this.rules.read;
    }

    canWrite() {

        return this.rules.write;
    }

    isSessionOnly() {

        return this.rules.sessionOnly;
    }

    update(payload = {}) {

        this.rules = {
            ...this.rules,
            ...payload
        };

        AppEvents.emit(
            'cookie_permissions:update',
            {
                rules: this.rules
            }
        );
    }

    denyRead() {

        this.rules.read = false;

        AppEvents.emit(
            'cookie_permissions:deny_read'
        );
    }

    denyWrite() {

        this.rules.write = false;

        AppEvents.emit(
            'cookie_permissions:deny_write'
        );
    }

    allowAll() {

        this.rules.read = true;
        this.rules.write = true;

        AppEvents.emit(
            'cookie_permissions:allow_all'
        );
    }

    getRules() {

        return {
            ...this.rules
        };
    }
}

const CookiePermissionsModule =
    new CookiePermissions();

export {
    CookiePermissionsModule
}; 
