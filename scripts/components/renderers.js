import { DataEngine } from '../core/data-engine.js';

/**
 * Render Plugin Card List
 * @param {Array} items 
 */
export const renderPluginGrid = (items) => {
    if (!items || items.length === 0) return `<p>No data available.</p>`;
    
    return `
        <section class="fade-in">
            <h1 class="FS-H1">Specialized Plugins</h1>
            <div class="grid-container">
                ${items.map(item => `
                    <article class="card">
                        <span class="tag">${DataEngine.sanitizeHTML(item.version)}</span>
                        <h2>${DataEngine.sanitizeHTML(item.name)}</h2>
                        <p>${DataEngine.sanitizeHTML(item.description)}</p>
                        <a href="${item.link}" class="btn-link">View Source</a>
                    </article>
                `).join('')}
            </div>
        </section>
    `;
};
 
