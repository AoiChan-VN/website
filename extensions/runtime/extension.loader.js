// estensions/runtime/extension.loader.js

(function () {
    'use strict';

    const EXTENSION_PATH = 'extensions/';
    const EXTENSION_RUNTIME = new Map();

    async function loadManifest(extensionName) {
        try {
            const response = await fetch(
                `${EXTENSION_PATH}${extensionName}/manifest.json`
            );

            if (!response.ok) {
                throw new Error(`Manifest load failed: ${extensionName}`);
            }

            return await response.json();
        } catch (error) {
            console.error('[AOI EXTENSION]', error);
            return null;
        }
    }

    async function loadStyle(extensionName) {
        const styleId = `aoi-extension-style-${extensionName}`;

        if (document.getElementById(styleId)) {
            return;
        }

        const link = document.createElement('link');

        link.id = styleId;
        link.rel = 'stylesheet';
        link.href = `${EXTENSION_PATH}${extensionName}/extension.css`;

        document.head.appendChild(link);
    }

    async function loadScript(extensionName) {
        return new Promise((resolve, reject) => {
            const scriptId = `aoi-extension-script-${extensionName}`;

            if (document.getElementById(scriptId)) {
                resolve();
                return;
            }

            const script = document.createElement('script');

            script.id = scriptId;
            script.src = `${EXTENSION_PATH}${extensionName}/extension.js`;
            script.defer = true;

            script.onload = () => resolve();
            script.onerror = () => reject();

            document.body.appendChild(script);
        });
    }

    async function install(extensionName) {
        if (EXTENSION_RUNTIME.has(extensionName)) {
            return EXTENSION_RUNTIME.get(extensionName);
        }

        const manifest = await loadManifest(extensionName);

        if (!manifest) {
            return null;
        }

        await loadStyle(extensionName);
        await loadScript(extensionName);

        const runtime = {
            name: extensionName,
            manifest,
            enabled: true,
            loadedAt: Date.now()
        };

        EXTENSION_RUNTIME.set(extensionName, runtime);

        window.dispatchEvent(
            new CustomEvent('aoi:extension:loaded', {
                detail: runtime
            })
        );

        return runtime;
    }

    function uninstall(extensionName) {
        const style = document.getElementById(
            `aoi-extension-style-${extensionName}`
        );

        const script = document.getElementById(
            `aoi-extension-script-${extensionName}`
        );

        if (style) style.remove();
        if (script) script.remove();

        EXTENSION_RUNTIME.delete(extensionName);

        window.dispatchEvent(
            new CustomEvent('aoi:extension:unloaded', {
                detail: {
                    name: extensionName
                }
            })
        );
    }

    function enable(extensionName) {
        const runtime = EXTENSION_RUNTIME.get(extensionName);

        if (!runtime) return;

        runtime.enabled = true;

        window.dispatchEvent(
            new CustomEvent('aoi:extension:enabled', {
                detail: runtime
            })
        );
    }

    function disable(extensionName) {
        const runtime = EXTENSION_RUNTIME.get(extensionName);

        if (!runtime) return;

        runtime.enabled = false;

        window.dispatchEvent(
            new CustomEvent('aoi:extension:disabled', {
                detail: runtime
            })
        );
    }

    function get(extensionName) {
        return EXTENSION_RUNTIME.get(extensionName) || null;
    }

    function getAll() {
        return Array.from(EXTENSION_RUNTIME.values());
    }

    window.AOI_EXTENSION_LOADER = {
        install,
        uninstall,
        enable,
        disable,
        get,
        getAll
    };
})(); 
