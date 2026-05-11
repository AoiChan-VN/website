import { Component } from '../../core/Component.js';
import { Renderer } from '../../runtime/Renderer.js';
import { registry } from '../../runtime/Registry.js';

export class AppShell extends Component {
    onMount() {
        // Mount Taskbar khi Shell sẵn sàng
        const TaskbarClass = registry.resolveComponent('Taskbar');
        new TaskbarClass().mount(this.element);
    }
    render() {
        return Renderer.createElement('div', { className: 'aoi-app-shell' },
            Renderer.createElement('header', { className: 'aoi-shell-header' }, 'Aoi Runtime OS'),
            Renderer.createElement('div', { id: 'aoi-window-layer', className: 'aoi-window-container' }),
            Renderer.createElement('main', { id: 'aoi-viewport' }, 'System Desktop Ready.')
        );
    }
}
