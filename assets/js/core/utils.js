export function slugify(text) {

    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')

}

export function safeHTML(value = '') {

    const div = document.createElement('div')

    div.textContent = value

    return div.innerHTML

} 
