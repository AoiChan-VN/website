const observedElements = new WeakSet();

let intersectionObserver = null;

function createObserver() {
    if (intersectionObserver) {
        return intersectionObserver;
    }

    intersectionObserver =
        new IntersectionObserver(
            handleIntersection,
            {
                root: null,
                rootMargin: '0px 0px -10% 0px',
                threshold: 0.15
            }
        );

    return intersectionObserver;
}

function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        const target = entry.target;

        requestAnimationFrame(() => {
            target.classList.add('revealed');
        });

        observer.unobserve(target);
        observedElements.delete(target);
    });
}

export function initializeScrollAnimation() {
    const elements = document.querySelectorAll(
        '.scroll-reveal'
    );

    const observer = createObserver();

    elements.forEach((element) => {
        if (observedElements.has(element)) {
            return;
        }

        observedElements.add(element);

        observer.observe(element);
    });
}

export function destroyScrollAnimation() {
    if (!intersectionObserver) {
        return;
    }

    intersectionObserver.disconnect();

    intersectionObserver = null;
} 
