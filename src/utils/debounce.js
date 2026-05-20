export function debounce(
    callback,
    delay = 120
) {
    let timeoutId = null;

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            callback(...args);
        }, delay);
    };
} 
