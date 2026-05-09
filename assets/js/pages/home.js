import { getState } from '../core/store.js'

import { HeroSection }
from '../modules/hero.js'

import { ProjectGrid }
from '../modules/project-grid.js'

import { FooterSection }
from '../modules/footer.js'

export function HomePage() {

    const state = getState()

    return `

        ${HeroSection(state.site)}

        ${ProjectGrid(state.projects)}

        ${FooterSection(state.site)}

    `

} 
