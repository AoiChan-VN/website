'use strict';

export function renderTabs() {

    const tabs = document.getElementById('aoi-tabs');

    if (!tabs) {
        return;
    }

    tabs.innerHTML = `
        <div class="aoi-tab active">
            New Tab
        </div>
    `;
} 
