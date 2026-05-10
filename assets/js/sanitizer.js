export function sanitize(text=''){

    const div = document.createElement('div');

    div.textContent = text;

    return div.innerHTML;
} 
