export function initializeInteractions() {

    document.addEventListener(
        'dragstart',
        event => {

            const target =
                event.target;

            if (
                target instanceof HTMLImageElement
            ) {

                event.preventDefault();

            }

        }
    );

} 
