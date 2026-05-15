// js/core/app.config.js

const AppConfig = Object.freeze({

    app: {
        name: 'AOI',
        version: '1.0.0',
        mode: 'production'
    },

    runtime: {
        bootTimeout: 10000,
        renderFrame: 16
    },

    router: {
        defaultRoute: '/',
        fallbackRoute: '/404'
    },

    storage: {
        database: 'aoi-engine',
        version: 1
    },

    cache: {
        runtime: 'aoi-runtime-cache',
        assets: 'aoi-assets-cache',
        content: 'aoi-content-cache'
    },

    worker: {
        main: '/workers/app.worker.js'
    },

    events: {
        namespace: 'aoi'
    },

    settings: {
        theme: 'system',
        animations: true
    }
});

export {
    AppConfig
}; 
