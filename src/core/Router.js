import { routes } from '../../data/routes.js';

export class Router {
    #routes;
    #currentPath;

    constructor() {
        this.#routes = routes;
        this.#currentPath =
            window.location.pathname;
    }

    initialize() {
        window.addEventListener(
            'popstate',
            this.handleRouteChange,
            {
                passive: true
            }
        );

        this.syncDocumentTitle();
    }

    navigate(path) {
        if (path === this.#currentPath) {
            return;
        }

        history.pushState({}, '', path);

        this.#currentPath = path;

        this.syncDocumentTitle();
    }

    syncDocumentTitle() {
        const currentRoute =
            this.#routes.find((route) => {
                return (
                    route.path ===
                    this.#currentPath
                );
            });

        if (!currentRoute) {
            return;
        }

        document.title = `
            Portfolio | ${currentRoute.pageTitle}
        `;
    }

    handleRouteChange = () => {
        this.#currentPath =
            window.location.pathname;

        this.syncDocumentTitle();
    };

    destroy() {
        window.removeEventListener(
            'popstate',
            this.handleRouteChange
        );
    }
} 
