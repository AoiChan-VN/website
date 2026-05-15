// js/modules/browser/browser.session.js

import { AppStorage } from '../../services/app.storage.js';
import { AppEvents } from '../../services/app.events.js';

class BrowserSession {

    constructor() {
        this.key = 'browser.session';

        this.session = {
            currentUrl: 'about:blank',
            lastVisited: null,
            tabs: []
        };
    }

    initialize() {

        this.restore();

        this.bindEvents();
    }

    bindEvents() {

        AppEvents.on('browser:navigated', ({ url }) => {

            this.session.currentUrl = url;
            this.session.lastVisited = Date.now();

            this.save();
        });

        AppEvents.on('tabs:create', ({ id }) => {

            this.session.tabs.push({
                id,
                createdAt: Date.now()
            });

            this.save();
        });

        AppEvents.on('tabs:close', ({ id }) => {

            this.session.tabs =
                this.session.tabs.filter(
                    (tab) => tab.id !== id
                );

            this.save();
        });
    }

    restore() {

        const stored =
            AppStorage.get(this.key);

        if (!stored) {
            return;
        }

        this.session = {
            ...this.session,
            ...stored
        };

        AppEvents.emit('session:restored', {
            session: this.session
        });
    }

    save() {

        AppStorage.set(
            this.key,
            this.session
        );

        AppEvents.emit('session:saved', {
            session: this.session
        });
    }

    getSession() {
        return this.session;
    }
}

const BrowserSessionModule =
    new BrowserSession();

export {
    BrowserSessionModule
}; 
