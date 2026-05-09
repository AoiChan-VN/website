import { ProjectCard }
from './project-card.js'

export function ProjectGrid(projects) {

    return `

        <section class="projects">

            <div class="container">

                <div class="projects__grid">

                    ${projects
                        .map(ProjectCard)
                        .join('')}

                </div>

            </div>

        </section>

    `

} 
