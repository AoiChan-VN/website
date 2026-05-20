import { fetchJSON } from '../utils/fetchJSON.js'
import { PluginCard } from '../components/PluginCard.js'

const grid = document.getElementById('pluginGrid')
const search = document.getElementById('search')

let plugins = []

async function loadPlugins() {

    plugins = await fetchJSON('./database/plugins/aoi-plugins.json')

    renderPlugins(plugins)
}

function renderPlugins(data) {

    grid.innerHTML = data.map(PluginCard).join('')
}

search.addEventListener('input', () => {

    const keyword = search.value.toLowerCase()

    const filtered = plugins.filter(plugin => {

        return plugin.name
            .toLowerCase()
            .includes(keyword)
    })

    renderPlugins(filtered)
})

loadPlugins()
