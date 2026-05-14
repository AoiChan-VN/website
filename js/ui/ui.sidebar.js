'use strict';

export function renderSidebar() {

    const sidebar = document.getElementById('aoi-sidebar');

    if (!sidebar) {
        return;
    }

    sidebar.innerHTML = `
        <button class="aoi-sidebar-button">🏠</button>
        <button class="aoi-sidebar-button">🧩</button>
        <button class="aoi-sidebar-button">⚙️</button>
    `;
}
