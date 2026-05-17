/**
 * AOI EXTENSION BOOT
 * runtime startup manager
 */

(function () {
    'use strict';

    const DEFAULT_EXTENSIONS = [];

    async function bootExtension(extensionName) {
        try {
            const runtime =
                await window.AOI_EXTENSION_LOADER.install(
                    extensionName
                );

            if (!runtime) {
                return false;
            }

            const manifest = runtime.manifest;

            if (manifest?.id) {
                window.AOI_EXTENSION_REGISTRY.register(
                    manifest
                );

                window.AOI_EXTENSION_REGISTRY
                    .markInstalled(
                        manifest.id,
                        true
                    );

                window.AOI_EXTENSION_REGISTRY
                    .markEnabled(
                        manifest.id,
                        true
                    );

                window.AOI_EXTENSION_SANDBOX.create(
                    manifest.id
                );
            }

            window.dispatchEvent(
                new CustomEvent(
                    'aoi:extension:booted',
                    {
                        detail: runtime
                    }
                )
            );

            return true;
        } catch (error) {
            console.error(
                '[AOI EXTENSION BOOT]',
                error
            );

            return false;
        }
    }

    async function bootAll() {
        for (const extensionName of DEFAULT_EXTENSIONS) {
            await bootExtension(extensionName);
        }
    }

    async function restoreInstalledExtensions() {
        try {
            const raw = localStorage.getItem(
                'aoi:extensions:installed'
            );

            if (!raw) {
                return;
            }

            const installed =
                JSON.parse(raw);

            if (!Array.isArray(installed)) {
                return;
            }

            for (const extensionName of installed) {
                await bootExtension(
                    extensionName
                );
            }
        } catch (error) {
            console.error(
                '[AOI EXTENSION RESTORE]',
                error
            );
        }
    }

    async function start() {
        await bootAll();

        await restoreInstalledExtensions();

        window.dispatchEvent(
            new CustomEvent(
                'aoi:extensions:ready'
            )
        );
    }

    if (
        document.readyState === 'loading'
    ) {
        document.addEventListener(
            'DOMContentLoaded',
            start
        );
    } else {
        start();
    }

    window.AOI_EXTENSION_BOOT = {
        start,
        bootAll,
        bootExtension
    };
})(); 
