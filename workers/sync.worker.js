// workers/sync.worker.js

const SyncRuntime = {

    syncing: false,

    queue: []
};

self.addEventListener('message', async (event) => {

    const payload =
        event.data || {};

    switch (payload.type) {

        case 'SYNC_PUSH':

            enqueue(payload.data);

            break;

        case 'SYNC_PROCESS':

            await processQueue();

            break;

        case 'SYNC_CLEAR':

            clearQueue();

            break;

        default:

            self.postMessage({
                type: 'SYNC_UNKNOWN',
                payload
            });
    }
});

function enqueue(data) {

    SyncRuntime.queue.push({
        data,
        timestamp: Date.now()
    });

    self.postMessage({
        type: 'SYNC_ENQUEUED',
        size: SyncRuntime.queue.length
    });
}

async function processQueue() {

    if (SyncRuntime.syncing) {
        return;
    }

    SyncRuntime.syncing = true;

    while (SyncRuntime.queue.length > 0) {

        const item =
            SyncRuntime.queue.shift();

        await simulateSync(item);
    }

    SyncRuntime.syncing = false;

    self.postMessage({
        type: 'SYNC_COMPLETE'
    });
}

async function simulateSync(item) {

    await delay(16);

    self.postMessage({
        type: 'SYNC_ITEM',
        item
    });
}

function clearQueue() {

    SyncRuntime.queue = [];

    self.postMessage({
        type: 'SYNC_CLEARED'
    });
}

function delay(time = 0) {

    return new Promise((resolve) => {

        setTimeout(resolve, time);
    });
  } 
