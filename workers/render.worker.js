// workers/render.worker.js

const RenderWorker = {

    frame: 0,

    running: false
};

self.addEventListener('message', async (event) => {

    const payload =
        event.data || {};

    switch (payload.type) {

        case 'RENDER_START':

            start();

            break;

        case 'RENDER_STOP':

            stop();

            break;

        case 'RENDER_FRAME':

            await renderFrame(payload);

            break;

        default:

            self.postMessage({
                type: 'RENDER_UNKNOWN',
                payload
            });
    }
});

function start() {

    if (RenderWorker.running) {
        return;
    }

    RenderWorker.running = true;

    self.postMessage({
        type: 'RENDER_STARTED'
    });
}

function stop() {

    RenderWorker.running = false;

    self.postMessage({
        type: 'RENDER_STOPPED'
    });
}

async function renderFrame(payload = {}) {

    if (!RenderWorker.running) {
        return;
    }

    RenderWorker.frame += 1;

    await delay(16);

    self.postMessage({
        type: 'RENDER_FRAME_COMPLETE',
        frame: RenderWorker.frame,
        timestamp: Date.now(),
        payload
    });
}

function delay(time = 0) {

    return new Promise((resolve) => {

        setTimeout(resolve, time);
    });
}
