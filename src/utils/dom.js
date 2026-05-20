export function createFragment() {
    return document.createDocumentFragment();
}

export function createElement(tagName, className = '') {
    const element = document.createElement(tagName);

    if (className) {
        element.className = className;
    }

    return element;
}

export function appendChildren(parent, children = []) {
    children.forEach((child) => {
        parent.appendChild(child);
    });

    return parent;
} 
