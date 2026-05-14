'use strict';

export function bootApplication() {

    console.log('[AOI] Boot Engine');

    registerServiceWorker();
}

async function registerServiceWorker() {

    if (!('serviceWorker' in navigator)) {
        return;
    }

    try {

        await navigator.serviceWorker.register('./sw.js');

        console.log('[AOI] Service Worker Registered');

    } catch (error) {

        console.error('[AOI] Service Worker Error', error);
    }
}
