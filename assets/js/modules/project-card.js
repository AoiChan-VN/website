import { safeHTML }
from '../core/utils.js'

export function ProjectCard(project) {

    return `

        <article
            class="project-card"
            data-reveal
        >

            <a
                href="#/project/${safeHTML(project.slug)}"
                data-link
                aria-label="${safeHTML(project.title)}"
            >

                <img
                    class="project-card__image"
                    src="${safeHTML(project.thumbnail)}"
                    alt="${safeHTML(project.title)}"
                    loading="lazy"
                    decoding="async"
                >

                <div class="project-card__content">

                    <h3>
                        ${safeHTML(project.title)}
                    </h3>

                    <p>
                        ${safeHTML(project.description)}
                    </p>

                </div>

            </a>

        </article>

    `

}
