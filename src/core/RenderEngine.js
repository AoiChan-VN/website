import {
    profileData,
    skillsData,
    projectsData
} from '../../data/portfolioData.js';

import { getCachedElement } from './DOMCache.js';

import { createFragment } from '../utils/dom.js';

import { ProfileSection } from '../components/ProfileSection.js';
import { SkillsSection } from '../components/SkillsSection.js';
import { ProjectsSection } from '../components/ProjectsSection.js';
import { ProjectCard } from '../components/ProjectCard.js';

export class RenderEngine {
    #renderQueue;

    constructor() {
        this.#renderQueue = [];
    }

    initialize() {
        this.renderProfile();
        this.renderSkills();
        this.renderProjects();
    }

    renderProfile() {
        const profileRoot = getCachedElement(
            '#profile-section'
        );

        if (!profileRoot) {
            return;
        }

        profileRoot.innerHTML =
            ProfileSection(profileData);
    }

    renderSkills() {
        const skillsRoot = getCachedElement(
            '#skills-section'
        );

        if (!skillsRoot) {
            return;
        }

        skillsRoot.innerHTML =
            SkillsSection(skillsData);
    }

    renderProjects() {
        const projectsRoot = getCachedElement(
            '#projects-section'
        );

        if (!projectsRoot) {
            return;
        }

        projectsRoot.innerHTML =
            ProjectsSection();

        const projectGrid =
            getCachedElement('#projects-grid');

        if (!projectGrid) {
            return;
        }

        const fragment = createFragment();

        projectsData.forEach((project) => {
            const projectCard =
                ProjectCard(project);

            fragment.appendChild(projectCard);
        });

        requestAnimationFrame(() => {
            projectGrid.appendChild(fragment);
        });
    }

    destroy() {
        this.#renderQueue.length = 0;
    }
  } 
