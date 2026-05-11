import { Renderer } from '../../runtime/Renderer.js';

export const AppShellTemplate = (props, state) => {
    return Renderer.createElement('div', { className: 'aoi-app-shell' },
        Renderer.createElement('header', { className: 'aoi-shell-header' }, 
            Renderer.createElement('h1', {}, props.title || 'Aoi Runtime OS')
        ),
        Renderer.createElement('main', { id: 'aoi-main-viewport', className: 'aoi-shell-content' },
            'Initializing System Viewport...'
        ),
        Renderer.createElement('footer', { className: 'aoi-shell-footer' },
            Renderer.createElement('span', {}, 'System Status: Operational')
        )
    );
};
 
// Thêm layer chứa cửa sổ riêng biệt
export const AppShellTemplate = (props, state) => {
    return Renderer.createElement('div', { className: 'aoi-app-shell' },
        Renderer.createElement('header', { className: 'aoi-shell-header' }, 'Aoi OS'),
        Renderer.createElement('div', { id: 'aoi-window-layer', className: 'aoi-window-container' }), // Window Layer
        Renderer.createElement('main', { id: 'aoi-main-viewport' })
    );
};
