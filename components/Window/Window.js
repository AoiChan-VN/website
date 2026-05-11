import { Component } from '../../core/Component.js';
import { Renderer } from '../../runtime/Renderer.js';
import { eventBus } from '../../system/EventBus.js';
import { windowManager } from '../../runtime/WindowManager.js';

export class Window extends Component {
    onMount() {
        eventBus.on('WINDOW_FOCUS', (d) => {
            if (d.id === this.props.id) this.element.style.zIndex = d.zIndex;
        });
        this.#initDrag();
    }

    #initDrag() {
        const h = this.element.querySelector('.win-header');
        h.onmousedown = (e) => {
            windowManager.focus(this.props.id);
            let x = e.clientX, y = e.clientY;
            document.onmousemove = (ev) => {
                this.element.style.left = (this.element.offsetLeft + (ev.clientX - x)) + "px";
                this.element.style.top = (this.element.offsetTop + (ev.clientY - y)) + "px";
                x = ev.clientX; y = ev.clientY;
            };
            document.onmouseup = () => document.onmousemove = null;
        };
    }

    destroy() { this.element.remove(); }

    render() {
        return Renderer.createElement('div', { className: 'aoi-window', style: 'top:100px;left:100px;' },
            Renderer.createElement('div', { className: 'win-header' }, this.props.title),
            Renderer.createElement('div', { className: 'win-body' }, this.props.content.render())
        );
    }
}
