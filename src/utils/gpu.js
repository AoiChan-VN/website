export function enableGPUAcceleration(
    element
) {
    if (!element) {
        return;
    }

    element.style.transform =
        'translateZ(0)';

    element.style.backfaceVisibility =
        'hidden';

    element.style.perspective =
        '1000px';
} 
