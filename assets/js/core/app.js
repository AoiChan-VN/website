import { router }
from './router.js';

import {
    initializeTheme
}
from '../modules/theme.js';

export function initApp() {

    initializeTheme();

    window.addEventListener(
        'hashchange',
        router
    );

    window.addEventListener(
        'load',
        router
    );

}
