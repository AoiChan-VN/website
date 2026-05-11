import { Component } from '../../core/Component.js';
import { AppShellTemplate } from './AppShell.template.js';
import { eventBus } from '../../system/EventBus.js';
import { Renderer } from '../../runtime/Renderer.js';

export class AppShell extends Component {
    onMount() {
        // Mount Taskbar vào Shell
        const TaskbarClass = registry.resolveComponent('Taskbar');
        const taskbar = new TaskbarClass();
        taskbar.mount(this.getElement()); // Mount trực tiếp vào container của Shell
    }

    // Helper để lấy element của chính component
    getElement() {
        return document.querySelector('.aoi-app-shell');
    }
}
    
        // Lắng nghe sự kiện chuyển trang nội bộ
        eventBus.on('ROUTER_CHANGE', ({ component: PageClass }) => {
            const viewport = document.getElementById('aoi-main-viewport');
            viewport.innerHTML = '';
            const page = new PageClass();
            page.mount(viewport);
        });
    }

    render() {
        return AppShellTemplate(this.props, this.state);
    }
}
