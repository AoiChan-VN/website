// js/services/app.storage.js

import { AppConfig } from '../core/app.config.js';

class AppStorageClass {

    constructor() {
        this.database = null;
        this.initialized = false;
    }

    async initialize() {

        if (this.initialized) {
            return;
        }

        this.database = window.localStorage;

        this.initialized = true;
    }

    getKey(key) {
        return `${AppConfig.app.name}:${key}`;
    }

    get(key, fallback = null) {

        try {

            const value = this.database.getItem(
                this.getKey(key)
            );

            if (value === null) {
                return fallback;
            }

            return JSON.parse(value);

        } catch (error) {

            console.error('[AOI] Storage Get Error', error);

            return fallback;
        }
    }

    set(key, value) {

        try {

            this.database.setItem(
                this.getKey(key),
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.error('[AOI] Storage Set Error', error);

            return false;
        }
    }

    remove(key) {

        try {

            this.database.removeItem(
                this.getKey(key)
            );

            return true;

        } catch (error) {

            console.error('[AOI] Storage Remove Error', error);

            return false;
        }
    }

    clear() {

        const prefix = `${AppConfig.app.name}:`;

        Object.keys(this.database).forEach((key) => {

            if (!key.startsWith(prefix)) {
                return;
            }

            this.database.removeItem(key);
        });
    }
}

const AppStorage = new AppStorageClass();

export {
    AppStorage
}; 
