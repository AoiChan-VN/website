'use strict';

import { bootApplication } from './core/app.boot.js';
import { createHeader } from './ui/ui.header.js';
import { createSidebar } from './ui/ui.sidebar.js';

const headerElement = document.getElementById('aoi-header');
const sidebarElement = document.getElementById('aoi-sidebar');

initializeApplication();

async function initializeApplication() {

    bootApplication();

    renderShell();

    await registerServiceWorker();
}

function renderShell() {

    if (headerElement) {
        headerElement.innerHTML = createHeader();
    }

    if (sidebarElement) {
        sidebarElement.innerHTML = createSidebar();
    }
}

async function registerServiceWorker() {

    if (!('serviceWorker' in navigator)) {
        return;
    }

    try {

        await navigator.serviceWorker.register('./sw.js');

        console.info('[AOI] Service Worker Registered');

    } catch (error) {

        console.error('[AOI] Service Worker Error', error);
    }
} 
