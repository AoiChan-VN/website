// js/modules/cookie/cookie.module.js

import { AppEvents } from '../../services/app.events.js';

class CookieModule {

    constructor() {
        this.cookies = new Map();
    }

    initialize() {

        this.restore();

        AppEvents.emit('cookie:ready');
    }

    set(name, value, options = {}) {

        if (!name) {
            return;
        }

        const payload = {
            value,
            options,
            updatedAt: Date.now()
        };

        this.cookies.set(name, payload);

        this.syncDocument();

        AppEvents.emit('cookie:set', {
            name
        });
    }

    get(name) {

        const cookie =
            this.cookies.get(name);

        if (!cookie) {
            return null;
        }

        return cookie.value;
    }

    remove(name) {

        if (!this.cookies.has(name)) {
            return;
        }

        this.cookies.delete(name);

        this.syncDocument();

        AppEvents.emit('cookie:remove', {
            name
        });
    }

    clear() {

        this.cookies.clear();

        this.syncDocument();

        AppEvents.emit('cookie:clear');
    }

    restore() {

        const raw =
            document.cookie || '';

        raw.split(';').forEach((entry) => {

            const [name, value] =
                entry.split('=');

            if (!name) {
                return;
            }

            this.cookies.set(
                name.trim(),
                {
                    value:
                        decodeURIComponent(
                            value || ''
                        )
                }
            );
        });
    }

    syncDocument() {

        const serialized =
            Array.from(
                this.cookies.entries()
            ).map(([name, payload]) => {

                return `${name}=${encodeURIComponent(
                    payload.value
                )}`;
            });

        document.cookie =
            serialized.join('; ');
    }
}

const CookieRuntimeModule =
    new CookieModule();

export {
    CookieRuntimeModule
}; 
