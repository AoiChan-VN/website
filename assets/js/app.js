import { loadSiteData } from './core/loader.js'
import { renderApp } from './core/renderer.js'
import { createState } from './core/state.js'

async function bootstrap() {

    try {

        const data = await loadSiteData()

        const state = createState(data)

        renderApp(state)

    } catch (error) {

        console.error('[BOOTSTRAP_ERROR]', error)

    }

}

bootstrap() 
