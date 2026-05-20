import { runtimeSettings } from '../../data/settings.js';

let imageObserver = null;

export function initializeLazyLoad() {
    if (imageObserver) {
        return;
    }

    imageObserver =
        new IntersectionObserver(
            handleIntersection,
            {
                rootMargin:
                    runtimeSettings.imageRootMargin,

                threshold:
                    runtimeSettings.imageThreshold
            }
        );

    const lazyImages =
        document.querySelectorAll(
            'img[data-src]'
        );

    lazyImages.forEach((image) => {
        imageObserver.observe(image);
    });
}

function handleIntersection(
    entries,
    observer
) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        const image = entry.target;

        image.src = image.dataset.src;

        image.removeAttribute('data-src');

        observer.unobserve(image);
    });
}

export function destroyLazyLoad() {
    if (!imageObserver) {
        return;
    }

    imageObserver.disconnect();

    imageObserver = null;
} 
