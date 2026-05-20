import { RenderEngine } from './core/RenderEngine.js';

import { Router } from './core/Router.js';

import { StateManager } from './core/StateManager.js';

import { EventSystem } from './core/EventSystem.js';

import { Lifecycle } from './core/Lifecycle.js';

import { ErrorBoundary } from './core/ErrorBoundary.js';

import { ComponentRegistry } from './core/ComponentRegistry.js';

import { AssetLoader } from './core/AssetLoader.js';

import { IdleScheduler } from './core/IdleScheduler.js';

import { PersistentStore } from './core/PersistentStore.js';

import { StreamingRenderer } from './core/StreamingRenderer.js';

import { CommandBus } from './core/CommandBus.js';

import { VisibilityManager } from './core/VisibilityManager.js';

import { RenderQueue } from './core/RenderQueue.js';

import { BackgroundTaskQueue } from './core/BackgroundTaskQueue.js';

import {
    initializeScrollAnimation
} from './utils/animation.js';

import {
    initializeLazyLoad
} from './utils/lazyLoad.js';

import {
    initializeAccessibility
} from './utils/accessibility.js';

import { enableGPUAcceleration } from './utils/gpu.js';

import { getNetworkStatus } from './utils/network.js';

import { MetricsPanel } from './components/MetricsPanel.js';

import { DiagnosticsPanel } from './components/DiagnosticsPanel.js';

const renderEngine = new RenderEngine();

const router = new Router();

const lifecycle = new Lifecycle();

const errorBoundary =
    new ErrorBoundary();

const componentRegistry =
    new ComponentRegistry();

const assetLoader =
    new AssetLoader();

const idleScheduler =
    new IdleScheduler();

const persistentStore =
    new PersistentStore(
        'portfolio'
    );

const streamingRenderer =
    new StreamingRenderer();

const commandBus =
    new CommandBus();

const visibilityManager =
    new VisibilityManager();

const renderQueue =
    new RenderQueue();

const backgroundTaskQueue =
    new BackgroundTaskQueue();

const appState = new StateManager({
    theme:
        persistentStore.get('theme') ||
        'dark'
});

function registerServiceWorker() {
    if (
        'serviceWorker' in navigator
    ) {
        navigator.serviceWorker.register(
            './service-worker.js'
        );
    }
}

function mountDiagnosticsPanel() {
    const panel =
        DiagnosticsPanel();

    document.body.appendChild(panel);

    const networkElement =
        document.querySelector(
            '#network-status'
        );

    const visibilityElement =
        document.querySelector(
            '#visibility-status'
        );

    networkElement.textContent =
        getNetworkStatus();

    visibilityManager.subscribe(
        (isVisible) => {
            visibilityElement.textContent =
                isVisible
                    ? 'Visible'
                    : 'Hidden';
        }
    );
}

function bootstrapApplication() {
    registerServiceWorker();

    errorBoundary.initialize();

    visibilityManager.initialize();

    router.initialize();

    renderQueue.enqueue(() => {
        renderEngine.initialize();
    });

    initializeScrollAnimation();

    initializeLazyLoad();

    initializeAccessibility();

    mountDiagnosticsPanel();

    enableGPUAcceleration(
        document.body
    );

    backgroundTaskQueue.add(() => {
        assetLoader.preloadImage(
            './assets/images/project-ai.webp'
        );
    });

    lifecycle.register(() => {
        router.destroy();
    });

    lifecycle.register(() => {
        errorBoundary.destroy();
    });

    lifecycle.register(() => {
        visibilityManager.destroy();
    });

    lifecycle.register(() => {
        componentRegistry.clear();
    });

    lifecycle.register(() => {
        renderQueue.clear();
    });

    lifecycle.register(() => {
        backgroundTaskQueue.clear();
    });

    lifecycle.register(() => {
        commandBus.destroy();
    });
}

window.addEventListener(
    'DOMContentLoaded',
    bootstrapApplication,
    {
        once: true,
        passive: true
    }
); 
