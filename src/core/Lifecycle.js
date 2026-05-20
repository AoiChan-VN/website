export class Lifecycle {
    #cleanupTasks;

    constructor() {
        this.#cleanupTasks = new Set();
    }

    register(task) {
        if (typeof task !== 'function') {
            return;
        }

        this.#cleanupTasks.add(task);
    }

    cleanup() {
        this.#cleanupTasks.forEach((task) => {
            task();
        });

        this.#cleanupTasks.clear();
    }
} 
