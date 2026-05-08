import { state }
from '../core/state.js';

import {
    getStorage,
    setStorage
}
from './storage.js';

const STORAGE_KEY =
    'app-theme';

export function initializeTheme() {

    const savedTheme =
        getStorage(STORAGE_KEY);

    if (savedTheme) {

        state.theme =
            savedTheme;

    }

    applyTheme(
        state.theme
    );

}

export function toggleTheme() {

    state.theme =
        state.theme === 'dark'
            ? 'light'
            : 'dark';

    applyTheme(
        state.theme
    );

    setStorage(
        STORAGE_KEY,
        state.theme
    );

}

export function applyTheme(theme) {

    document.documentElement
        .dataset.theme = theme;

} 
