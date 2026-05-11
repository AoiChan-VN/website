import { Component } from '../core/Component.js';
import { Renderer } from '../runtime/Renderer.js';

export class DesktopPage extends Component {
    render() {
        return Renderer.createElement('div', { className: 'aoi-page' },
            Renderer.createElement('h2', {}, 'System Desktop'),
            Renderer.createElement('p', {}, 'Chào mừng bạn đến với Aoi Runtime OS.')
        );
    }
}
 
