import { toggleTheme } from '../modules/theme.js';

export function createThemeToggle() {

    const button =
        document.createElement('button');

    button.className =
        'theme-toggle';

    button.type =
        'button';

    button.textContent =
        'Theme';

    button.addEventListener(
        'click',
        toggleTheme
    );

    return button;

} 
