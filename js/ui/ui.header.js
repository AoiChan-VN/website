'use strict';

export function renderHeader() {

    const header = document.getElementById('aoi-header');

    if (!header) {
        return;
    }

    header.innerHTML = `
        <div class="aoi-header-title">
            AOI Browser
        </div>

        <div class="aoi-header-actions">
            <button class="aoi-sidebar-button">+</button>
        </div>
    `;
}
