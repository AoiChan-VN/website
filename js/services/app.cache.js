// js/services/app.cache.js

import { AppEvents } from './app.events.js';

class AppCacheService {

    constructor() {
        this.storage = new Map();

        this.maxEntries = 250;
    }

    initialize() {

        AppEvents.emit('app_cache:ready');
    }

    set(key, value) {

        if (!key) {
            return;
        }

        if (
            this.storage.size >=
            this.maxEntries
        ) {

            const oldest =
                this.storage.keys().next().value;

            this.storage.delete(oldest);
        }

        this.storage.set(key, {
            value,
            timestamp: Date.now()
        });

        AppEvents.emit('app_cache:set', {
            key
        });
    }

    get(key) {

        const entry =
            this.storage.get(key);

        if (!entry) {
            return null;
        }

        return entry.value;
    }

    has(key) {

        return this.storage.has(key);
    }

    remove(key) {

        if (!this.storage.has(key)) {
            return;
        }

        this.storage.delete(key);

        AppEvents.emit('app_cache:remove', {
            key
        });
    }

    clear() {

        this.storage.clear();

        AppEvents.emit('app_cache:clear');
    }

    keys() {

        return Array.from(
            this.storage.keys()
        );
    }

    size() {

        return this.storage.size;
    }
}

const AppCache =
    new AppCacheService();

export {
    AppCache
}; 
