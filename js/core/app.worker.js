'use strict';

let browserWorker = null;

export function createBrowserWorker() {

    if (browserWorker) {
        return browserWorker;
    }

    browserWorker = new Worker('./workers/browser.worker.js');

    browserWorker.addEventListener('message', handleWorkerMessage);

    return browserWorker;
}

function handleWorkerMessage(event) {

    const payload = event.data;

    if (!payload || !payload.type) {
        return;
    }

    switch (payload.type) {

        case 'PONG':
            console.info('[AOI] Worker Pong', payload.timestamp);
            break;

        case 'CACHE_SUCCESS':
            console.info('[AOI] Cache Success', payload.url);
            break;

        case 'CACHE_CLEARED':
            console.info('[AOI] Cache Cleared');
            break;

        case 'CACHE_ERROR':
            console.error('[AOI] Cache Error', payload.message);
            break;

        default:
            console.warn('[AOI] Unknown Worker Message');
            break;
    }
}

export function sendWorkerMessage(message) {

    if (!browserWorker) {
        return;
    }

    browserWorker.postMessage(message);
} 
