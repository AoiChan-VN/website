import { Component } from '../../core/Component.js';
import { AppShellTemplate } from './AppShell.template.js';
import { EventBus } from '../../system/EventBus.js';
import { Renderer } from '../../runtime/Renderer.js';

export class AppShell extends Component {
    onMount() {
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
