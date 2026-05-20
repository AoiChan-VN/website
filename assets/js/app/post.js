const markdown = document.getElementById('markdown')

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

async function loadPost() {

    const response = await fetch('./database/plugins/aoi-plugins.json')
    const plugins = await response.json()

    const plugin = plugins.find(item => item.id === id)

    if (!plugin) {
        markdown.innerHTML = '<h1>Plugin Not Found</h1>'
        return
    }

    const md = await fetch(plugin.file)
    const content = await md.text()

    markdown.innerHTML = `
        <h1>${plugin.name}</h1>
        <pre>${content}</pre>
    `
}

loadPost()
