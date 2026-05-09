const routes = new Map()

export function registerRoute(path, handler) {

    routes.set(path, handler)

}

export function navigate(path) {

    history.pushState({}, '', path)

    resolveRoute()

}

export async function resolveRoute() {

    const pathname = window.location.pathname

    const dynamicProject = pathname.startsWith('/project/')

    if (dynamicProject) {

        const slug = pathname.split('/project/')[1]

        const handler = routes.get('/project/:slug')

        if (handler) {

            await handler({ slug })

            return

        }

    }

    const route = routes.get(pathname)

    if (route) {

        await route()

        return

    }

    const notFound = routes.get('/404')

    if (notFound) {

        await notFound()

    }

}

window.addEventListener(
    'popstate',
    resolveRoute
) 
