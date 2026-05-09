export function ProjectCard(project) {

    return `

        <article
            class="project-card"
            data-reveal
        >

            <a
                href="/project/${project.slug}"
                data-link
            >

                <img
                    class="project-card__image"
                    src="${project.thumbnail}"
                    alt="${project.title}"
                    loading="lazy"
                >

                <div class="project-card__content">

                    <h3>
                        ${project.title}
                    </h3>

                    <p>
                        ${project.description}
                    </p>

                </div>

            </a>

        </article>

    `

} 
