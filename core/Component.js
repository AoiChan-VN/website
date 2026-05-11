import { Renderer } from '../runtime/Renderer.js';
import { Scheduler } from '../scheduler/Scheduler.js';

/**
 * Base Component Class.
 * Quản lý: Props, State, Lifecycle (onMount, onUpdate, onDestroy).
 */
export class Component {
    #container = null;
    props = {};
    state = {};

    constructor(props = {}) {
        this.props = props;
    }

    // Lifecycle Hooks (To be overridden)
    onMount() {}
    onUpdate() {}
    onDestroy() {}

    /**
     * Re-render scheduler.
     */
    update() {
        Scheduler.enqueue(() => {
            const oldElement = this.#container;
            const newElement = this.render();
            
            if (oldElement && oldElement.parentNode) {
                oldElement.parentNode.replaceChild(newElement, oldElement);
                this.#container = newElement;
                this.onUpdate();
            }
        });
    }

    mount(parent) {
        this.#container = this.render();
        parent.appendChild(this.#container);
        this.onMount();
        return this.#container;
    }

    render() {
        throw new Error("Method 'render()' must be implemented.");
    }
}
 
