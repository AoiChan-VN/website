import { Component } from '../../core/Component.js';
import { WindowTemplate } from './Window.template.js';
import { windowManager } from '../../runtime/WindowManager.js';

export class Window extends Component {
    #zIndex = 100;

    constructor(props) {
        super(props);
    }

    setZIndex(value) {
        this.#zIndex = value;
        const el = document.getElementById(this.props.id);
        if (el) el.style.zIndex = value;
    }

    onMount() {
        this.#loadStyles();
        this.#setupDragging();
    }

    #loadStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './components/Window/Window.style.css';
        document.head.appendChild(link);
    }

    #setupDragging() {
        // Implementation logic cho Drag & Drop (Native JS)
        const header = document.getElementById(`${this.props.id}-header`);
        const win = document.getElementById(this.props.id);
        
        header.onmousedown = (e) => {
            windowManager.focus(this.props.id.replace('win-', ''));
            let pos1 = 0, pos2 = 0, pos3 = e.clientX, pos4 = e.clientY;
            
            document.onmousemove = (e) => {
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                win.style.top = (win.offsetTop - pos2) + "px";
                win.style.left = (win.offsetLeft - pos1) + "px";
            };
            
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }

    render() {
        return WindowTemplate(this.props, this.state);
    }

    destroy() {
        const el = document.getElementById(this.props.id);
        if (el) el.remove();
        this.onDestroy();
    }
}
 
