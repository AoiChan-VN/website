import { themes } from '../../data/themes.js';

export function ThemeToggle() {
    const button =
        document.createElement('button');

    button.className = 'theme-toggle';

    button.type = 'button';

    button.textContent =
        themes.dark.label;

    return button;
} 
