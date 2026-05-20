export class RenderQueue {
    #queue;
    #isProcessing;

    constructor() {
        this.#queue = [];

        this.#isProcessing = false;
    }

    enqueue(task) {
        this.#queue.push(task);

        if (!this.#isProcessing) {
            this.process();
        }
    }

    process() {
        this.#isProcessing = true;

        queueMicrotask(() => {
            while (this.#queue.length) {
                const task =
                    this.#queue.shift();

                task();
            }

            this.#isProcessing = false;
        });
    }

    clear() {
        this.#queue.length = 0;
    }
} 
