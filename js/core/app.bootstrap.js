// js/core/app.bootstrap.js

import { AppEvents } from '../services/app.events.js';

import { BrowserRuntimeModule }
    from '../modules/browser/browser.module.js';

import { BrowserHistoryModule }
    from '../modules/browser/browser.history.js';

import { BrowserSessionModule }
    from '../modules/browser/browser.session.js';

import { BrowserPermissionsModule }
    from '../modules/browser/browser.permissions.js';

import { BrowserSecurityModule }
    from '../modules/browser/browser.security.js';

import { BrowserSandboxModule }
    from '../modules/browser/browser.sandbox.js';

import { BrowserCacheModule }
    from '../modules/browser/browser.cache.js';

import { TabsRuntimeModule }
    from '../modules/tabs/tabs.module.js';

import { TabsPersistenceModule }
    from '../modules/tabs/tabs.persistence.js';

import { VirtualTabsModule }
    from '../modules/tabs/tabs.virtual.js';

import { TabsSnapshotModule }
    from '../modules/tabs/tabs.snapshot.js';

import { SettingsRuntimeModule }
    from '../modules/settings/settings.module.js';

import { ThemeModule }
    from '../modules/settings/settings.theme.js';

import { RenderRuntimeModule }
    from '../modules/render/render.module.js';

import { RenderQueueModule }
    from '../modules/render/render.queue.js';

import { RenderSchedulerModule }
    from '../modules/render/render.scheduler.js';

import { RenderVisibilityModule }
    from '../modules/render/render.visibility.js';

class AppBootstrap {

    constructor() {
        this.initialized = false;
    }

    async initialize() {

        if (this.initialized) {
            return;
        }

        await BrowserRuntimeModule.initialize();
        BrowserHistoryModule.initialize();
        BrowserSessionModule.initialize();
        BrowserPermissionsModule.initialize();
        BrowserSecurityModule.initialize();
        BrowserSandboxModule.initialize();
        BrowserCacheModule.initialize();

        await TabsRuntimeModule.initialize();
        TabsPersistenceModule.initialize();
        VirtualTabsModule.initialize();
        TabsSnapshotModule.initialize();

        await SettingsRuntimeModule.initialize();
        ThemeModule.initialize();

        await RenderRuntimeModule.initialize();
        RenderQueueModule.initialize();
        RenderSchedulerModule.initialize();
        RenderVisibilityModule.initialize();

        this.initialized = true;

        AppEvents.emit('app:booted');
    }
}

const AppBootstrapRuntime =
    new AppBootstrap();

export {
    AppBootstrapRuntime
}; 
