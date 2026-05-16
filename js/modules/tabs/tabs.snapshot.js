// js/modules/tabs/tabs.snapshot.js

import { AppStorage } from '../../services/app.storage.js';
import { AppEvents } from '../../services/app.events.js';

class TabsSnapshot {

    constructor() {
        this.storageKey = 'tabs.snapshots';

        this.snapshots = new Map();
    }

    initialize() {

        this.restore();

        this.bindEvents();

        AppEvents.emit('snapshot:ready');
    }

    bindEvents() {

        AppEvents.on('browser:navigated', ({
            url
        }) => {

            const activeTab =
                document.querySelector(
                    '.aoi-tab.is-active'
                );

            if (!activeTab) {
                return;
            }

            const id =
                activeTab.dataset.tabId;

            this.capture(id, {
                url,
                timestamp: Date.now()
            });
        });

        AppEvents.on('tabs:close', ({ id }) => {

            this.remove(id);
        });
    }

    capture(id, payload = {}) {

        if (!id) {
            return;
        }

        this.snapshots.set(id, payload);

        this.save();

        AppEvents.emit('snapshot:capture', {
            id
        });
    }

    restoreSnapshot(id) {

        return this.snapshots.get(id) || null;
    }

    remove(id) {

        this.snapshots.delete(id);

        this.save();

        AppEvents.emit('snapshot:remove', {
            id
        });
    }

    save() {

        AppStorage.set(
            this.storageKey,
            Array.from(
                this.snapshots.entries()
            )
        );
    }

    restore() {

        const stored =
            AppStorage.get(
                this.storageKey,
                []
            );

        stored.forEach(([id, payload]) => {

            this.snapshots.set(
                id,
                payload
            );
        });
    }
}

const TabsSnapshotModule =
    new TabsSnapshot();

export {
    TabsSnapshotModule
}; 
