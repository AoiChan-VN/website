// js/core/app.extension.js

import { AppEvents } from '../services/app.events.js';

class AppExtensionManager {

    constructor() {
        this.extensions = new Map();

        this.runtime = {
            initialized: false
        };
    }

    async initialize() {

        if (this.runtime.initialized) {
            return;
        }

        this.runtime.initialized = true;

        AppEvents.emit('extensions:ready');
    }

    async register(manifest, extension) {

        if (!this.validateManifest(manifest)) {
            return false;
        }

        if (this.extensions.has(manifest.id)) {
            return false;
        }

        this.extensions.set(manifest.id, {
            manifest,
            extension,
            enabled: false
        });

        AppEvents.emit('extension:registered', {
            id: manifest.id
        });

        if (manifest.enabled) {
            await this.enable(manifest.id);
        }

        return true;
    }

    async enable(id) {

        const target =
            this.extensions.get(id);

        if (!target || target.enabled) {
            return;
        }

        if (
            typeof target.extension.enable ===
            'function'
        ) {
            await target.extension.enable();
        }

        target.enabled = true;

        AppEvents.emit('extension:enabled', {
            id
        });
    }

    async disable(id) {

        const target =
            this.extensions.get(id);

        if (!target || !target.enabled) {
            return;
        }

        if (
            typeof target.extension.disable ===
            'function'
        ) {
            await target.extension.disable();
        }

        target.enabled = false;

        AppEvents.emit('extension:disabled', {
            id
        });
    }

    async uninstall(id) {

        const target =
            this.extensions.get(id);

        if (!target) {
            return;
        }

        if (target.enabled) {
            await this.disable(id);
        }

        this.extensions.delete(id);

        AppEvents.emit('extension:uninstalled', {
            id
        });
    }

    validateManifest(manifest) {

        if (!manifest) {
            return false;
        }

        const required = [
            'id',
            'name',
            'version',
            'entry'
        ];

        return required.every((key) => {
            return key in manifest;
        });
    }

    get(id) {

        return this.extensions.get(id) || null;
    }

    getAll() {

        return Array.from(
            this.extensions.values()
        );
    }
}

const AppExtensionRuntime =
    new AppExtensionManager();

export {
    AppExtensionRuntime
};
