const domCache = new Map();

export function getCachedElement(selector) {
    if (domCache.has(selector)) {
        return domCache.get(selector);
    }

    const element = document.querySelector(selector);

    if (element) {
        domCache.set(selector, element);
    }

    return element;
}

export function clearDOMCache() {
    domCache.clear();
}
