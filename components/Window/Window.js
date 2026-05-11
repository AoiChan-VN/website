import { Component } from '../../core/Component.js';
import { Renderer } from '../../runtime/Renderer.js';
import { eventBus } from '../../system/EventBus.js';
import { windowManager } from '../../runtime/WindowManager.js';

export class Window extends Component {
    onMount() {
        eventBus.on('WINDOW_FOCUS', (d) => {
            if (d.id === this.props.id) this.element.style.zIndex = d.zIndex;
        });
        this.#setupDrag();
    }

    #setupDrag() {
        const header = this.element.querySelector('.win-header');
        header.onmousedown = (e) => {
            windowManager.focus(this.props.id);
            let x = e.clientX, y = e.clientY;
            const move = (ev) => {
                this.element.style.left = `${this.element.offsetLeft + (ev.clientX - x)}px`;
                this.element.style.top = `${this.element.offsetTop + (ev.clientY - y)}px`;
                x = ev.clientX; y = ev.clientY;
            };
            const stop = () => document.removeEventListener('mousemove', move);
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', stop, { once: true });
        };
    }

    destroy() {
        this.onDestroy();
        this.element.remove();
    }

    render() {
        return Renderer.createElement('div', { 
            className: 'aoi-window',
            onMouseDown: () => windowManager.focus(this.props.id)
        },
            Renderer.createElement('div', { className: 'win-header' },
                Renderer.createElement('span', {}, this.props.title),
                Renderer.createElement('button', { 
                    className: 'win-close',
                    onClick: (e) => { e.stopPropagation(); windowManager.close(this.props.id); }
                }, '×')
            ),
            Renderer.createElement('div', { className: 'win-body' }, 
                this.props.content.render()
            )
        );
    }
}
