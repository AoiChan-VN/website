import { Renderer } from '../../runtime/Renderer.js';

export const AppShellTemplate = (props, state) => {
    return Renderer.createElement('div', { className: 'aoi-app-shell' },
        Renderer.createElement('header', { className: 'aoi-shell-header' }, 
            Renderer.createElement('h1', {}, props.title)
        ),
        // Layer riêng cho Windows để quản lý Z-Index tách biệt
        Renderer.createElement('div', { id: 'aoi-window-layer', className: 'aoi-window-container' }),
        Renderer.createElement('main', { id: 'aoi-main-viewport', className: 'aoi-shell-content' },
            'Desktop Interface Active'
        )
    );
};
