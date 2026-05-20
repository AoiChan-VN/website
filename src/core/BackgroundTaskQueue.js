export class BackgroundTaskQueue {
    #tasks;

    constructor() {
        this.#tasks = [];
    }

    add(task) {
        this.#tasks.push(task);

        this.execute();
    }

    execute() {
        if (!this.#tasks.length) {
            return;
        }

        requestIdleCallback(() => {
            const currentTask =
                this.#tasks.shift();

            if (currentTask) {
                currentTask();
            }

            this.execute();
        });
    }

    clear() {
        this.#tasks.length = 0;
    }
} 
