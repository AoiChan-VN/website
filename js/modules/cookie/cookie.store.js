// js/modules/cookie/cookie.store.js

import { AppStorage } from '../../services/app.storage.js';
import { AppEvents } from '../../services/app.events.js';

class CookieStore {

    constructor() {
        this.storageKey = 'browser.cookies';

        this.entries = {};
    }

    initialize() {

        this.restore();

        this.bindEvents();

        AppEvents.emit('cookie_store:ready');
    }

    bindEvents() {

        AppEvents.on('cookie:set', ({
            name
        }) => {

            this.capture(name);
        });

        AppEvents.on('cookie:remove', ({
            name
        }) => {

            delete this.entries[name];

            this.save();
        });

        AppEvents.on('cookie:clear', () => {

            this.entries = {};

            this.save();
        });
    }

    capture(name) {

        if (!name) {
            return;
        }

        const cookies =
            document.cookie.split(';');

        const target =
            cookies.find((entry) => {

                return entry
                    .trim()
                    .startsWith(`${name}=`);
            });

        if (!target) {
            return;
        }

        const [, value] =
            target.split('=');

        this.entries[name] = {
            value:
                decodeURIComponent(
                    value || ''
                ),
            updatedAt: Date.now()
        };

        this.save();

        AppEvents.emit('cookie_store:update', {
            name
        });
    }

    save() {

        AppStorage.set(
            this.storageKey,
            this.entries
        );
    }

    restore() {

        const stored =
            AppStorage.get(
                this.storageKey,
                {}
            );

        this.entries = stored;
    }

    getAll() {

        return {
            ...this.entries
        };
    }
}

const CookieStoreModule =
    new CookieStore();

export {
    CookieStoreModule
}; 
