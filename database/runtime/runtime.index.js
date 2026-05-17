// database/runtime/runtime.index.js

import { RuntimeDB } from './runtime.db.js';

class RuntimeIndex {

    constructor() {
        this.indexes = new Map();
    }

    initialize() {

        this.create('tabs');
        this.create('history');
        this.create('extensions');

        RuntimeDB.initialize();
    }

    create(collection) {

        if (!collection) {
            return;
        }

        if (this.indexes.has(collection)) {
            return;
        }

        this.indexes.set(
            collection,
            new Map()
        );
    }

    build(collection, entries = []) {

        if (!this.indexes.has(collection)) {
            return;
        }

        const index =
            this.indexes.get(collection);

        index.clear();

        entries.forEach((entry) => {

            if (!entry.id) {
                return;
            }

            index.set(entry.id, entry);
        });
    }

    get(collection, id) {

        const index =
            this.indexes.get(collection);

        if (!index) {
            return null;
        }

        return index.get(id) || null;
    }

    remove(collection, id) {

        const index =
            this.indexes.get(collection);

        if (!index) {
            return;
        }

        index.delete(id);
    }

    clear(collection) {

        const index =
            this.indexes.get(collection);

        if (!index) {
            return;
        }

        index.clear();
    }
}

const RuntimeIndexDB =
    new RuntimeIndex();

export {
    RuntimeIndexDB
}; 
