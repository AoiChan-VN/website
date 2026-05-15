// workers/app.worker.js

const WorkerRuntime = {

    initialized: false,

    async initialize() {

        if (this.initialized) {
            return;
        }

        this.bindEvents();

        this.initialized = true;

        this.dispatch('worker:ready');
    },

    bindEvents() {

        self.addEventListener('message', async (event) => {

            const payload = event.data;

            if (!payload?.type) {
                return;
            }

            await this.handle(payload);
        });
    },

    async handle(payload) {

        switch (payload.type) {

            case 'runtime:ping':

                this.dispatch('runtime:pong', {
                    timestamp: Date.now()
                });

                break;

            case 'cache:clear':

                await this.clearCache();

                break;

            default:

                this.dispatch('worker:unknown', {
                    type: payload.type
                });

                break;
        }
    },

    dispatch(type, data = {}) {

        self.postMessage({
            type,
            data
        });
    },

    async clearCache() {

        if (!self.caches) {
            return;
        }

        const keys = await caches.keys();

        await Promise.all(
            keys.map((key) => caches.delete(key))
        );

        this.dispatch('cache:cleared');
    }
};

WorkerRuntime.initialize(); 
