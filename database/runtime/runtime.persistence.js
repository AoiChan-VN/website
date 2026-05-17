// database/runtime/runtime.persistence.js

import { AppStorage } from '../../js/services/app.storage.js';
import { RuntimeDB } from './runtime.db.js';
import { AppEvents } from '../../js/services/app.events.js';

class RuntimePersistence {

    constructor() {
        this.storageKey = 'runtime.database';
    }

    initialize() {

        this.restore();

        this.bindEvents();

        AppEvents.emit(
            'runtime_persistence:ready'
        );
    }

    bindEvents() {

        AppEvents.on('runtime_db:insert', () => {
            this.save();
        });

        AppEvents.on('runtime_db:remove', () => {
            this.save();
        });

        AppEvents.on('runtime_db:clear', () => {
            this.save();
        });
    }

    save() {

        const serialized = {};

        RuntimeDB.collections.forEach(
            (entries, collection) => {

                serialized[collection] = entries;
            }
        );

        AppStorage.set(
            this.storageKey,
            serialized
        );

        AppEvents.emit(
            'runtime_persistence:saved'
        );
    }

    restore() {

        const stored =
            AppStorage.get(
                this.storageKey,
                {}
            );

        Object.entries(stored).forEach(
            ([collection, entries]) => {

                RuntimeDB.collections.set(
                    collection,
                    entries
                );
            }
        );

        AppEvents.emit(
            'runtime_persistence:restored'
        );
    }
}

const RuntimePersistenceDB =
    new RuntimePersistence();

export {
    RuntimePersistenceDB
}; 
