import { Component } from '../../core/Component.js';
import { AppShellTemplate } from './AppShell.template.js';
import { registry } from '../../runtime/Registry.js';

export class AppShell extends Component {
    onMount() {
        // Mount Taskbar vào vùng Shell
        const TaskbarClass = registry.resolveComponent('Taskbar');
        const taskbar = new TaskbarClass();
        taskbar.mount(this.element); 
    }

    render() {
        return AppShellTemplate(this.props, this.state);
    }
}
