/**
 * AOI EXTENSION REGISTRY
 * extension manifest registry
 */

(function () {
    'use strict';

    const REGISTRY = new Map();

    function validateManifest(manifest) {
        if (!manifest) return false;

        const requiredFields = [
            'id',
            'name',
            'version',
            'main'
        ];

        for (const field of requiredFields) {
            if (!manifest[field]) {
                console.error(
                    `[AOI EXTENSION] missing manifest field: ${field}`
                );

                return false;
            }
        }

        return true;
    }

    function register(manifest) {
        const valid = validateManifest(manifest);

        if (!valid) {
            return false;
        }

        if (REGISTRY.has(manifest.id)) {
            console.warn(
                `[AOI EXTENSION] duplicated extension id: ${manifest.id}`
            );

            return false;
        }

        REGISTRY.set(manifest.id, {
            ...manifest,
            installed: false,
            enabled: false,
            registeredAt: Date.now()
        });

        window.dispatchEvent(
            new CustomEvent('aoi:extension:registered', {
                detail: manifest
            })
        );

        return true;
    }

    function unregister(extensionId) {
        if (!REGISTRY.has(extensionId)) {
            return false;
        }

        REGISTRY.delete(extensionId);

        window.dispatchEvent(
            new CustomEvent('aoi:extension:unregistered', {
                detail: {
                    id: extensionId
                }
            })
        );

        return true;
    }

    function markInstalled(extensionId, state = true) {
        const extension = REGISTRY.get(extensionId);

        if (!extension) return;

        extension.installed = state;
    }

    function markEnabled(extensionId, state = true) {
        const extension = REGISTRY.get(extensionId);

        if (!extension) return;

        extension.enabled = state;
    }

    function get(extensionId) {
        return REGISTRY.get(extensionId) || null;
    }

    function getAll() {
        return Array.from(REGISTRY.values());
    }

    function has(extensionId) {
        return REGISTRY.has(extensionId);
    }

    window.AOI_EXTENSION_REGISTRY = {
        register,
        unregister,
        markInstalled,
        markEnabled,
        get,
        getAll,
        has
    };
})(); 
