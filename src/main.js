import { RenderEngine } from './core/RenderEngine.js';

import { Router } from './core/Router.js';

import { StateManager } from './core/StateManager.js';

import { EventSystem } from './core/EventSystem.js';

import { Lifecycle } from './core/Lifecycle.js';

import { ErrorBoundary } from './core/ErrorBoundary.js';

import {
    initializeScrollAnimation,
    destroyScrollAnimation
} from './utils/animation.js';

import {
    initializeLazyLoad,
    destroyLazyLoad
} from './utils/lazyLoad.js';

import { PerformanceMonitor } from './utils/performance.js';

const renderEngine = new RenderEngine();

const router = new Router();

const eventSystem =
    new EventSystem();

const lifecycle = new Lifecycle();

const errorBoundary =
    new ErrorBoundary();

const appState = new StateManager({
    theme: 'dark'
});

const performanceMonitor =
    new PerformanceMonitor();

function applyTheme(themeId) {
    document.documentElement.dataset.theme =
        themeId;
}

function bootstrapApplication() {
    errorBoundary.initialize();

    router.initialize();

    renderEngine.initialize();

    initializeScrollAnimation();

    initializeLazyLoad();

    applyTheme(
        appState.getState().theme
    );

    performanceMonitor.start();

    lifecycle.register(() => {
        destroyScrollAnimation();
    });

    lifecycle.register(() => {
        destroyLazyLoad();
    });

    lifecycle.register(() => {
        router.destroy();
    });

    lifecycle.register(() => {
        eventSystem.destroy();
    });

    lifecycle.register(() => {
        appState.destroy();
    });

    lifecycle.register(() => {
        errorBoundary.destroy();
    });
}

function cleanupApplication() {
    lifecycle.cleanup();
}

window.addEventListener(
    'DOMContentLoaded',
    bootstrapApplication,
    {
        once: true,
        passive: true
    }
);

window.addEventListener(
    'beforeunload',
    cleanupApplication,
    {
        passive: true
    }
);
