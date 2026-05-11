/**
 * Renderer Engine: Data-driven UI renderer.
 * Tuyệt đối không sử dụng innerHTML architecture.
 */
export class Renderer {
    static createElement(type, props = {}, ...children) {
        const element = document.createElement(type);
        
        Object.entries(props).forEach(([key, value]) => {
            if (key.startsWith('on') && typeof value === 'function') {
                element.addEventListener(key.substring(2).toLowerCase(), value);
            } else if (key === 'className') {
                element.setAttribute('class', value);
            } else {
                element.setAttribute(key, value);
            }
        });

        children.flat().forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof HTMLElement) {
                element.appendChild(child);
            }
        });

        return element;
    }

    static render(vNode, container) {
        container.innerHTML = '';
        container.appendChild(vNode);
    }
}
 
