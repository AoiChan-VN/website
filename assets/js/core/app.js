import { router } from './router.js';
import { initializeTheme } from '../modules/theme.js';
import { initializeAccessibility } from '../modules/accessibility.js';
import { initializeInteractions } from '../modules/interaction.js';

export function initApp() {

    initializeTheme();

    initializeAccessibility();

    initializeInteractions();

    window.addEventListener(
        'hashchange',
        router
    );

    window.addEventListener(
        'load',
        router
    );

}
