import { sanitizeHTML } from '../utils/sanitizer.js';

export function ProfileSection(profile) {
    return `
        <section class="profile-container scroll-reveal">
            <div class="profile-avatar-wrapper">
                <img
                    class="profile-avatar"
                    src="${sanitizeHTML(profile.avatar)}"
                    alt="${sanitizeHTML(profile.fullName)}"
                />
            </div>

            <div class="profile-content">
                <h1 class="profile-name">
                    ${sanitizeHTML(profile.fullName)}
                </h1>

                <h2 class="profile-role">
                    ${sanitizeHTML(profile.role)}
                </h2>

                <p class="profile-tagline">
                    ${sanitizeHTML(profile.tagline)}
                </p>

                <div class="profile-meta">
                    <span>${sanitizeHTML(profile.location)}</span>
                    <span>${sanitizeHTML(profile.email)}</span>
                </div>
            </div>
        </section>
    `;
} 
