// database/runtime/runtime.db.js

import { AppEvents } from '../../js/services/app.events.js';

class RuntimeDatabase {

    constructor() {
        this.collections = new Map();
    }

    initialize() {

        this.createCollection('tabs');
        this.createCollection('history');
        this.createCollection('extensions');
        this.createCollection('settings');

        AppEvents.emit('runtime_db:ready');
    }

    createCollection(name) {

        if (!name || this.collections.has(name)) {
            return;
        }

        this.collections.set(name, []);

        AppEvents.emit('runtime_db:collection', {
            name
        });
    }

    insert(collection, payload = {}) {

        const target =
            this.collections.get(collection);

        if (!target) {
            return null;
        }

        const entry = {
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            ...payload
        };

        target.push(entry);

        AppEvents.emit('runtime_db:insert', {
            collection,
            entry
        });

        return entry;
    }

    find(collection, predicate = null) {

        const target =
            this.collections.get(collection);

        if (!target) {
            return [];
        }

        if (typeof predicate !== 'function') {
            return [...target];
        }

        return target.filter(predicate);
    }

    remove(collection, predicate) {

        const target =
            this.collections.get(collection);

        if (!target) {
            return;
        }

        const filtered =
            target.filter((entry) => {
                return !predicate(entry);
            });

        this.collections.set(
            collection,
            filtered
        );

        AppEvents.emit('runtime_db:remove', {
            collection
        });
    }

    clear(collection) {

        if (!this.collections.has(collection)) {
            return;
        }

        this.collections.set(collection, []);

        AppEvents.emit('runtime_db:clear', {
            collection
        });
    }
}

const RuntimeDB =
    new RuntimeDatabase();

export {
    RuntimeDB
}; 
