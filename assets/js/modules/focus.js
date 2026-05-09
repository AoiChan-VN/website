export function restoreFocus() {

    const app =
        document.querySelector('#app');

    if (!app) {
        return;
    }

    app.setAttribute(
        'tabindex',
        '-1'
    );

    app.focus();

} 
