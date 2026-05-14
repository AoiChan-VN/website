'use strict';

const routes = new Map();

export function registerRoute(path, callback) {

    if (!path || typeof callback !== 'function') {
        return;
    }

    routes.set(path, callback);
}

export function navigate(path) {

    const route = routes.get(path);

    if (!route) {
        console.warn(`[AOI] Route not found: ${path}`);
        return;
    }

    route();
} 
