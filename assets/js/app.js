import { fetchJSON }
from './core/loader.js'

import { discoverProjects }
from './core/discovery.js'

import { updateState }
from './core/store.js'

import {
    registerRoute,
    resolveRoute
}
from './core/router.js'

import { render }
from './core/renderer.js'

import { bindRouterLinks }
from './core/events.js'

import { HomePage }
from './pages/home.js'

import { ProjectPage }
from './pages/project.js'

import { NotFoundPage }
from './pages/not-found.js'

async function bootstrap() {

    try {

        const site =
            await fetchJSON(
                './data/site.json'
            )

        const projects =
            await discoverProjects()

        updateState({
            site,
            projects
        })

        registerRoute(
            '/',
            () => render(
                HomePage()
            )
        )

        registerRoute(
            '/project/:slug',
            params => render(
                ProjectPage(params)
            )
        )

        registerRoute(
            '/404',
            () => render(
                NotFoundPage()
            )
        )

        bindRouterLinks()

        await resolveRoute()

    } catch (error) {

        console.error(
            '[APP_ERROR]',
            error
        )

    }

}

bootstrap()
