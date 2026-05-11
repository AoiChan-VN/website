import { Component } from '../../core/Component.js';
import { TaskbarTemplate } from './Taskbar.template.js';
import { eventBus } from '../../system/EventBus.js';
import { windowManager } from '../../runtime/WindowManager.js';

export class Taskbar extends Component {
    #activeApps = [];

    onMount() {
        this.#loadStyles();
        // Lắng nghe thay đổi cửa sổ để cập nhật Taskbar
        eventBus.on('WINDOW_FOCUS', (appId) => {
            this.#updateActiveApps(appId);
        });
    }

    #loadStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './components/Taskbar/Taskbar.style.css';
        document.head.appendChild(link);
    }

    #updateActiveApps(appId) {
        if (!this.#activeApps.includes(appId)) {
            this.#activeApps.push(appId);
            this.update();
        }
    }

    render() {
        return TaskbarTemplate({
            apps: this.#activeApps,
            onAppClick: (appId) => windowManager.focus(appId)
        }, this.state);
    }
}
 
