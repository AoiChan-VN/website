// main.js

/* core services */

import {
    AppEvents
} from './js/services/app.events.js';

import {
    AppLoggerRuntime
} from './js/services/app.logger.js';

import {
    AppDiagnosticsRuntime
} from './js/services/app.diagnostics.js';

import {
    AppPerformanceRuntime
} from './js/services/app.performance.js';

import {
    AppMemoryRuntime
} from './js/services/app.memory.js';

import {
    AppRuntimeMonitorRuntime
} from './js/services/app.runtime.monitor.js';

/* ui runtime */

import {
    UILayoutRuntime
} from './js/ui/ui.layout.js';

import {
    UISidebarRuntime
} from './js/ui/ui.sidebar.js';

import {
    UITabsRuntime
} from './js/ui/ui.tabs.js';

import {
    UIBrowserRuntime
} from './js/ui/ui.browser.js';

import {
    UIViewportRuntime
} from './js/ui/ui.viewport.js';

import {
    UISettingsRuntime
} from './js/ui/ui.settings.js';

import {
    UINotificationsRuntime
} from './js/ui/ui.notifications.js';

/* bootstrap */

class AOIRuntime {

    async initialize() {

        this.initializeServices();

        this.initializeUI();

        this.initializeTheme();

        this.initializeEvents();

        AppEvents.emit(
            'app:booted'
        );

        AppLoggerRuntime.info(
            'AOI Runtime Booted'
        );
    }

    initializeServices() {

        AppLoggerRuntime.initialize();

        AppDiagnosticsRuntime.initialize();

        AppPerformanceRuntime.initialize();

        AppMemoryRuntime.initialize();

        AppRuntimeMonitorRuntime.initialize();
    }

    initializeUI() {

        UILayoutRuntime.initialize();

        UISidebarRuntime.initialize();

        UITabsRuntime.initialize();

        UIBrowserRuntime.initialize();

        UIViewportRuntime.initialize();

        UISettingsRuntime.initialize();

        UINotificationsRuntime.initialize();
    }

    initializeTheme() {

        document.body.classList.add(
            'theme-default'
        );
    }

    initializeEvents() {

        AppEvents.on(
            'ui_browser:navigate',
            ({ query }) => {

                AppLoggerRuntime.info(
                    'Navigate',
                    {
                        query
                    }
                );
            }
        );

        AppEvents.on(
            'ui_settings:theme',
            ({ theme }) => {

                AppLoggerRuntime.info(
                    'Theme Changed',
                    {
                        theme
                    }
                );

                AppEvents.emit(
                    'ui_notifications:push',
                    {
                        type: 'success',
                        title: 'Theme Applied',
                        message:
                            `Active: ${theme}`
                    }
                );
            }
        );
    }
}

const runtime =
    new AOIRuntime();

window.addEventListener(
    'DOMContentLoaded',
    () => {

        runtime.initialize();
    }
);
