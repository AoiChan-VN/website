import { createNavigation } from './navigation.js';

import { createThemeToggle } from './theme-toggle.js';

export function createHeader() {

    const header =
        document.createElement('header');

    header.className =
        'site-header';

    const container =
        document.createElement('div');

    container.className =
        'container header-container';

    const logo =
        document.createElement('a');

    logo.className =
        'site-logo';

    logo.href =
        '#/';

    logo.textContent =
        'YOUR LOGO';

    const navigation =
        createNavigation();

    const themeToggle =
        createThemeToggle();

    container.append(
        logo,
        navigation,
        themeToggle
    );

    header.append(
        container
    );

    return header;

}
