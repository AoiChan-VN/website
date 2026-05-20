import { sanitizeHTML } from '../utils/sanitizer.js';

export function SkillsSection(skills) {
    const skillsHTML = skills
        .map((skill) => {
            return `
                <li class="skill-item scroll-reveal">
                    ${sanitizeHTML(skill)}
                </li>
            `;
        })
        .join('');

    return `
        <section class="skills-container">
            <header class="section-header">
                <h2>Skills</h2>
            </header>

            <ul class="skills-grid">
                ${skillsHTML}
            </ul>
        </section>
    `;
} 
