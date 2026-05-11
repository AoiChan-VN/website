import { Renderer } from '../runtime/Renderer.js';
import { Scheduler } from '../scheduler/Scheduler.js';

export class Component {
    constructor(props = {}) {
        this.props = props;
        this.state = {};
        this.element = null;
    }

    onMount() {}
    onUpdate() {}
    onDestroy() {}

    update() {
        Scheduler.enqueue(() => {
            const newElement = this.render();
            if (this.element && this.element.parentNode) {
                this.element.parentNode.replaceChild(newElement, this.element);
                this.element = newElement;
                this.onUpdate();
            }
        });
    }

    mount(parent) {
        this.element = this.render();
        parent.appendChild(this.element);
        this.onMount();
        return this.element;
    }

    render() {
        throw new Error("Method 'render()' must be implemented.");
    }
}
