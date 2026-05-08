let ticking =
    false;

export function optimizedScroll(
    callback
) {

    window.addEventListener(
        'scroll',
        () => {

            if (ticking) {
                return;
            }

            requestAnimationFrame(() => {

                callback();

                ticking = false;

            });

            ticking = true;

        },
        {
            passive: true
        }
    );

} 
