'use strict';

import { bootApplication } from './core/app.boot.js';

import { renderHeader } from './ui/ui.header.js';
import { renderSidebar } from './ui/ui.sidebar.js';
import { renderTabs } from './ui/ui.tabs.js';
import { renderBrowserView } from './ui/ui.browser.js';

window.addEventListener('DOMContentLoaded', () => {

    bootApplication();

    renderHeader();
    renderSidebar();
    renderTabs();
    renderBrowserView();
});
