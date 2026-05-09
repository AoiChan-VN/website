async function fetchJSON(path) {

    const response = await fetch(path)

    if (!response.ok) {

        throw new Error(`Failed to fetch: ${path}`)

    }

    return response.json()

}

async function loadProjects() {

    const site = await fetchJSON('./data/site.json')

    const projects = await Promise.all(

        site.projects.map(project =>
            fetchJSON(`./data/projects/${project}`)
        )

    )

    return {

        site,
        projects

    }

}

export async function loadSiteData() {

    return loadProjects()

} 
