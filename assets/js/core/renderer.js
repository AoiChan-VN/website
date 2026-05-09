import { HeroSection } from '../modules/hero.js'
import { ProjectsSection } from '../modules/projects.js'
import { FooterSection } from '../modules/footer.js'

export function renderApp(state) {

    const app = document.querySelector('#app')

    app.innerHTML = `

        ${HeroSection(state.site)}

        ${ProjectsSection(state.projects)}

        ${FooterSection(state.site)}

    `

} 
