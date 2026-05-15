// js/core/app.constants.js

const APP_STATUS = Object.freeze({
    BOOTING: 'booting',
    READY: 'ready',
    CRASHED: 'crashed'
});

const ROUTE_EVENTS = Object.freeze({
    CHANGE: 'router:change',
    INITIALIZED: 'router:initialized'
});

const RUNTIME_EVENTS = Object.freeze({
    INITIALIZED: 'runtime:initialized',
    MODULE_REGISTERED: 'runtime:module_registered',
    SERVICE_REGISTERED: 'runtime:service_registered'
});

const STORAGE_EVENTS = Object.freeze({
    READY: 'storage:ready'
});

const WORKER_EVENTS = Object.freeze({
    READY: 'workers:ready'
});

const APP_EVENTS = Object.freeze({
    READY: 'app:ready',
    CRASH: 'app:crash',
    SHUTDOWN: 'app:shutdown',
    VISIBILITY: 'app:visibility'
});

const DATASET_KEYS = Object.freeze({
    APP: 'app',
    ROUTE: 'route'
});

export {
    APP_STATUS,
    ROUTE_EVENTS,
    RUNTIME_EVENTS,
    STORAGE_EVENTS,
    WORKER_EVENTS,
    APP_EVENTS,
    DATASET_KEYS
}; 
