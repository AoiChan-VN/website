import { fetchJSON } from './loader.js'

export async function discoverProjects() {

    const manifest = await fetchJSON(
        './data/projects/manifest.json'
    )

    const projects = await Promise.all(

        manifest.items.map(item =>
            fetchJSON(`./data/projects/${item}`)
        )

    )

    return projects

} 
