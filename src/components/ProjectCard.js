import { sanitizeHTML } from '../utils/sanitizer.js';

export function ProjectCard(project) {
    const article = document.createElement('article');

    article.className =
        'project-card scroll-reveal';

    article.dataset.projectId = project.id;

    const techStackHTML = project.techStack
        .map((tech) => {
            return `
                <li class="project-tech-item">
                    ${sanitizeHTML(tech)}
                </li>
            `;
        })
        .join('');

    article.innerHTML = `
        <div class="project-card-image-wrapper">
            <img
                class="project-card-image"
                src="${sanitizeHTML(project.image)}"
                alt="${sanitizeHTML(project.title)}"
                loading="lazy"
                decoding="async"
            />
        </div>

        <div class="project-card-content">
            <h3 class="project-card-title">
                ${sanitizeHTML(project.title)}
            </h3>

            <p class="project-card-description">
                ${sanitizeHTML(project.desc)}
            </p>

            <ul class="project-tech-list">
                ${techStackHTML}
            </ul>

            <a
                class="project-card-link"
                href="${sanitizeHTML(project.link)}"
                target="_blank"
                rel="noopener noreferrer"
            >
                View Project
            </a>
        </div>
    `;

    return article;
} 
