'use strict';

export function renderBrowserView() {

    const browser = document.getElementById('aoi-browser-view');

    if (!browser) {
        return;
    }

    browser.innerHTML = `
        <iframe
            class="aoi-browser-frame"
            src="https://example.com"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin">
        </iframe>
    `;
} 
