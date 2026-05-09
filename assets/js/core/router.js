const routes = new Map()

function getCurrentPath() {

    const hash = window.location.hash || '#/'

    return hash.slice(1)

}

export function registerRoute(path, handler) {

    routes.set(path, handler)

}

export function navigate(path) {

    window.location.hash = path

}

export async function resolveRoute() {

    const pathname = getCurrentPath()

    const dynamicProject =
        pathname.startsWith('/project/')

    if (dynamicProject) {

        const slug =
            pathname.split('/project/')[1]

        const handler =
            routes.get('/project/:slug')

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
    'hashchange',
    resolveRoute
)
