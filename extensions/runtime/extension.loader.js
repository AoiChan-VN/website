// extensions/runtime/extension.loader.js

import { AppEvents } from '../../js/services/app.events.js';
import { AppExtensionRuntime } from '../../js/core/app.extension.js';

class ExtensionLoader {

    constructor() {
        this.loaded = new Set();
    }

    async initialize() {

        AppEvents.emit('extension_loader:ready');
    }

    async load(path) {

        if (!path || this.loaded.has(path)) {
            return null;
        }

        try {

            const manifestModule =
                await fetch(
                    `${path}/manifest.json`
                );

            const manifest =
                await manifestModule.json();

            const extensionModule =
                await import(
                    `../../${path}/${manifest.entry}`
                );

            const extension =
                extensionModule.default;

            const registered =
                await AppExtensionRuntime.register(
                    manifest,
                    extension
                );

            if (!registered) {
                return null;
            }

            if (
                typeof extension.initialize ===
                'function'
            ) {
                await extension.initialize();
            }

            this.loaded.add(path);

            AppEvents.emit('extension_loader:loaded', {
                id: manifest.id
            });

            return manifest;

        } catch (error) {

            console.error(
                '[AOI] Extension Load Error',
                error
            );

            AppEvents.emit('extension_loader:error', {
                path,
                error
            });

            return null;
        }
    }

    isLoaded(path) {

        return this.loaded.has(path);
    }

    getLoaded() {

        return Array.from(this.loaded);
    }
}

const ExtensionLoaderRuntime =
    new ExtensionLoader();

export {
    ExtensionLoaderRuntime
}; 
