import { RenderEngine } from './core/RenderEngine.js';

import {
    initializeScrollAnimation,
    destroyScrollAnimation
} from './utils/animation.js';

const renderEngine = new RenderEngine();

function bootstrapApplication() {
    renderEngine.initialize();

    requestAnimationFrame(() => {
        initializeScrollAnimation();
    });
}

function cleanupApplication() {
    destroyScrollAnimation();

    renderEngine.destroy();
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
