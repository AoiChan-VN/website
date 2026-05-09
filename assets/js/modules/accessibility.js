export function initializeAccessibility() {

    document.documentElement.lang =
        'en';

    document.body.setAttribute(
        'tabindex',
        '-1'
    );

} 
