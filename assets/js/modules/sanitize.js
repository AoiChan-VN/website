export function sanitize(value) {

    if (typeof value !== 'string') {
        return '';
    }

    return value
        .trim()
        .toLowerCase();

} 
