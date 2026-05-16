// js/modules/browser/browser.cache.js

import { AppStorage } from '../../services/app.storage.js';
import { AppEvents } from '../../services/app.events.js';

class BrowserCache {

    constructor() {
        this.storageKey = 'browser.cache';

        this.entries = new Map();
    }

    initialize() {

        this.restore();

        this.bindEvents();

        AppEvents.emit('cache:ready');
    }

    bindEvents() {

        AppEvents.on('browser:navigated', ({ url }) => {

            this.touch(url);
        });

        AppEvents.on('cache:clear', () => {

            this.clear();
        });
    }

    touch(url) {

        if (!url) {
            return;
        }

        this.entries.set(url, {
            url,
            timestamp: Date.now()
        });

        this.save();

        AppEvents.emit('cache:update', {
            url
        });
    }

    has(url) {

        return this.entries.has(url);
    }

    get(url) {

        return this.entries.get(url) || null;
    }

    clear() {

        this.entries.clear();

        this.save();

        AppEvents.emit('cache:cleared');
    }

    save() {

        AppStorage.set(
            this.storageKey,
            Array.from(this.entries.values())
        );
    }

    restore() {

        const stored =
            AppStorage.get(
                this.storageKey,
                []
            );

        stored.forEach((entry) => {

            this.entries.set(
                entry.url,
                entry
            );
        });
    }
}

const BrowserCacheModule =
    new BrowserCache();

export {
    BrowserCacheModule
}; 
