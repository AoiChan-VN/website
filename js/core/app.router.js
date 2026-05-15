// js/core/app.router.js

import { AppEvents } from '../services/app.events.js';

class AppRouterClass {

    constructor() {
        this.currentRoute = '/';
        this.routes = new Map();

        this.initialized = false;
    }

    async initialize() {

        if (this.initialized) {
            return;
        }

        this.bindBrowserEvents();

        this.resolve();

        this.initialized = true;

        AppEvents.emit('router:initialized', {
            route: this.currentRoute
        });
    }

    bindBrowserEvents() {

        window.addEventListener('popstate', () => {
            this.resolve();
        });

        document.addEventListener('click', (event) => {

            const target = event.target.closest('[data-route]');

            if (!target) {
                return;
            }

            event.preventDefault();

            const route = target.dataset.route;

            this.navigate(route);
        });
    }

    register(path, handler) {

        if (this.routes.has(path)) {
            return;
        }

        this.routes.set(path, handler);
    }

    navigate(path = '/') {

        if (this.currentRoute === path) {
            return;
        }

        history.pushState({}, '', path);

        this.resolve();
    }

    resolve() {

        const path = window.location.pathname || '/';

        this.currentRoute = path;

        const handler = this.routes.get(path);

        if (typeof handler === 'function') {
            handler({
                path
            });
        }

        document.documentElement.dataset.route = path;

        AppEvents.emit('router:change', {
            path
        });
    }

    getCurrentRoute() {
        return this.currentRoute;
    }
}

const AppRouter = new AppRouterClass();

export {
    AppRouter
}; 
