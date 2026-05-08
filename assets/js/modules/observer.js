const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const target =
                    entry.target;

                const callback =
                    target.__observerCallback;

                if (callback) {
                    callback(target);
                }

                observer.unobserve(target);

            });

        },
        {
            rootMargin: '200px'
        }
    );

export function observe(
    element,
    callback
) {

    element.__observerCallback =
        callback;

    observer.observe(element);

} 
