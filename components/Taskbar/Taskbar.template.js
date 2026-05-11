import { Renderer } from '../../runtime/Renderer.js';

export const TaskbarTemplate = (props, state) => {
    return Renderer.createElement('div', { className: 'aoi-taskbar' },
        Renderer.createElement('div', { className: 'start-btn' }, '🌀'),
        Renderer.createElement('div', { className: 'taskbar-apps' },
            props.apps.map(appId => 
                Renderer.createElement('div', { 
                    className: 'taskbar-item',
                    onClick: () => props.onAppClick(appId)
                }, appId.toUpperCase())
            )
        ),
        Renderer.createElement('div', { className: 'system-tray' }, 
            new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        )
    );
};
 
