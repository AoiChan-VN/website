/**
 * LayoutManager: Điều phối việc mount các Layout và Pages vào vùng Root.
 */
export class LayoutManager {
    static #currentLayout = null;

    static async setLayout(LayoutClass, container) {
        if (this.#currentLayout) {
            this.#currentLayout.onDestroy?.();
        }
        this.#currentLayout = new LayoutClass();
        container.innerHTML = ''; // Clear container trước khi mount layout mới
        return this.#currentLayout.mount(container);
    }
}
 
