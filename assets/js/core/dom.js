export function createDOM(html) {

    const template = document.createElement('template')

    template.innerHTML = html.trim()

    return template.content

}

export function clearDOM(element) {

    while (element.firstChild) {

        element.removeChild(element.firstChild)

    }

} 
