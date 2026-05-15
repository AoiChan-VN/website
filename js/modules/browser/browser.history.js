// js/modules/browser/browser.history.js

import { AppEvents } from '../../services/app.events.js';

class BrowserHistory {

    constructor() {
        this.entries = [];
        this.position = -1;
    }

    initialize() {

        this.bindEvents();
    }

    bindEvents() {

        AppEvents.on('browser:navigated', ({ url }) => {
            this.push(url);
        });
    }

    push(url) {

        if (!url) {
            return;
        }

        const current =
            this.entries[this.position];

        if (current === url) {
            return;
        }

        this.entries =
            this.entries.slice(
                0,
                this.position + 1
            );

        this.entries.push({
            url,
            timestamp: Date.now()
        });

        this.position =
            this.entries.length - 1;

        AppEvents.emit('history:update', {
            entries: this.entries,
            position: this.position
        });
    }

    back() {

        if (this.position <= 0) {
            return null;
        }

        this.position -= 1;

        const entry =
            this.entries[this.position];

        AppEvents.emit('history:change', {
            entry
        });

        return entry;
    }

    forward() {

        if (
            this.position >=
            this.entries.length - 1
        ) {
            return null;
        }

        this.position += 1;

        const entry =
            this.entries[this.position];

        AppEvents.emit('history:change', {
            entry
        });

        return entry;
    }

    current() {

        return this.entries[this.position] || null;
    }

    clear() {

        this.entries = [];
        this.position = -1;

        AppEvents.emit('history:cleared');
    }
}

const BrowserHistoryModule =
    new BrowserHistory();

export {
    BrowserHistoryModule
}; 
