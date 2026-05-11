import { Component } from '../../core/Component.js';
import { Renderer } from '../../runtime/Renderer.js';
import { registry } from '../../runtime/Registry.js';

export class Dashboard extends Component {
    #apps = [];

    async onMount() {
        const appService = registry.getService('AppService');
        this.#apps = await appService.getInstalledApps();
        this.update(); // Trigger re-render sau khi có data
    }

    render() {
        return Renderer.createElement('div', { className: 'aoi-dashboard' },
            Renderer.createElement('h2', {}, 'System Dashboard'),
            Renderer.createElement('div', { className: 'aoi-app-grid' },
                this.#apps.map(app => 
                    Renderer.createElement('div', { 
                        className: 'aoi-app-card',
                        onClick: () => registry.getService('AppService').notifySystem(`Opening ${app.name}...`)
                    }, 
                        Renderer.createElement('span', { className: 'app-icon' }, app.icon),
                        Renderer.createElement('p', {}, app.name)
                    )
                )
            )
        );
    }
}
 
