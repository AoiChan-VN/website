import { getState } from '../core/store.js'

export function ProjectPage(params) {

    const state = getState()

    const project = state.projects.find(
        item => item.slug === params.slug
    )

    if (!project) {

        return `

            <section class="empty">

                <div class="container">

                    <h1>
                        Project Not Found
                    </h1>

                </div>

            </section>

        `

    }

    return `

        <section class="project-page">

            <div class="container">

                <h1>
                    ${project.title}
                </h1>

                <p>
                    ${project.description}
                </p>

            </div>

        </section>

    `

} 
