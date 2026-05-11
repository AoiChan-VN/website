import { Component } from '../../core/Component.js';
import { Renderer } from '../../runtime/Renderer.js';
import { eventBus } from '../../system/EventBus.js';
import { windowManager } from '../../runtime/WindowManager.js';

export class Window extends Component {
    onMount() {
        // Cập nhật Z-Index khi có sự kiện focus
        eventBus.on('WINDOW_FOCUS', (data) => {
            if (data.id === this.props.id) {
                this.element.style.zIndex = data.zIndex;
            }
        });
        this.#setupDragging();
    }

    #setupDragging() {
        const header = this.element.querySelector('.win-header');
        header.onmousedown = (e) => {
            windowManager.focus(this.props.id);
            let pos1 = 0, pos2 = 0, pos3 = e.clientX, pos4 = e.clientY;
            document.onmousemove = (ev) => {
                pos1 = pos3 - ev.clientX; pos2 = pos4 - ev.clientY;
                pos3 = ev.clientX; pos4 = ev.clientY;
                this.element.style.top = (this.element.offsetTop - pos2) + "px";
                this.element.style.left = (this.element.offsetLeft - pos1) + "px";
            };
            document.onmouseup = () => { document.onmousemove = null; };
        };
    }

    destroy() { this.element.remove(); }

    render() {
        return Renderer.createElement('div', { className: 'aoi-window', id: `win-${this.props.id}` },
            Renderer.createElement('div', { className: 'win-header' }, 
                Renderer.createElement('span', {}, this.props.title),
                Renderer.createElement('button', { onClick: () => windowManager.close(this.props.id) }, 'X')
            ),
            Renderer.createElement('div', { className: 'win-body' }, this.props.content.render())
        );
    }
}
