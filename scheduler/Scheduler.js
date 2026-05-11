/**
 * Scheduler: Điều phối luồng xử lý UI.
 * Sử dụng requestAnimationFrame để tối ưu hóa Frame Rate.
 */
export class Scheduler {
    static #queue = new Set();
    static #isPending = false;

    static enqueue(task) {
        this.#queue.add(task);
        this.#requestFlush();
    }

    static #requestFlush() {
        if (this.#isPending) return;
        this.#isPending = true;
        
        requestAnimationFrame(() => {
            this.#flush();
        });
    }

    static #flush() {
        for (const task of this.#queue) {
            task();
        }
        this.#queue.clear();
        this.#isPending = false;
    }
}
 
