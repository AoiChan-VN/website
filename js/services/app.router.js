// js/services/app.router.js

import { AppEvents } from './app.events.js';

class AppRouter {

    constructor() {
        this.current = '/';

        this.routes = new Map();
    }

    initialize() {

        this.bindEvents();

        this.sync();

        AppEvents.emit('router:ready');
    }

    bindEvents() {

        window.addEventListener(
            'popstate',
            () => {

                this.sync();
            }
        );
    }

    register(path, callback) {

        if (
            !path ||
            typeof callback !== 'function'
        ) {
            return;
        }

        this.routes.set(path, callback);

        AppEvents.emit('router:register', {
            path
        });
    }

    navigate(path = '/') {

        if (!path) {
            return;
        }

        history.pushState({}, '', path);

        this.current = path;

        this.resolve(path);

        AppEvents.emit('router:navigate', {
            path
        });
    }

    resolve(path) {

        const target =
            this.routes.get(path);

        if (!target) {

            AppEvents.emit(
                'router:not_found',
                {
                    path
                }
            );

            return;
        }

        try {

            target();

            AppEvents.emit(
                'router:resolved',
                {
                    path
                }
            );

        } catch (error) {

            console.error(
                '[AOI] Router Error',
                error
            );
        }
    }

    sync() {

        this.current =
            window.location.pathname;

        this.resolve(this.current);
    }

    getCurrent() {

        return this.current;
    }
}

const AppRouterRuntime =
    new AppRouter();

export {
    AppRouterRuntime
}; 
