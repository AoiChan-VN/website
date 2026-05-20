export function sanitizeHTML(value = '') {
    const temporaryElement = document.createElement('div');

    temporaryElement.textContent = value;

    return temporaryElement.innerHTML;
}
