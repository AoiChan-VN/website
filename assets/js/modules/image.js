import { observe }
from './observer.js';

export function lazyLoadImage(image) {

    const source =
        image.dataset.src;

    if (!source) {
        return;
    }

    observe(image, target => {

        target.src =
            source;

        target.removeAttribute(
            'data-src'
        );

        target.classList.add(
            'loaded'
        );

    });

} 
