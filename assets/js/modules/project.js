export function ProjectsSection(projects) {

    return `

        <section class="projects">

            <div class="container">

                <div class="projects__grid">

                    ${projects.map(project => `

                        <article class="project-card">

                            <img
                                class="project-card__image"
                                src="${project.thumbnail}"
                                alt="${project.title}"
                            >

                            <div class="project-card__content">

                                <h3>
                                    ${project.title}
                                </h3>

                                <p>
                                    ${project.description}
                                </p>

                            </div>

                        </article>

                    `).join('')}

                </div>

            </div>

        </section>

    `

} 
