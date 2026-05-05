/**
 * @fileoverview UI Component Factory
 * @description Tập trung các hàm render component tái sử dụng
 */

import { DataEngine } from '../core/data-engine.js';

export const UIRenderer = {
    /**
     * Render một Card cho Project/Plugin
     * @param {Object} item - Object chứa thông tin dự án
     * @returns {string} HTML String
     */
    createCard(item) {
        const title = DataEngine.sanitizeHTML(item.name);
        const desc = DataEngine.sanitizeHTML(item.description);
        const version = DataEngine.sanitizeHTML(item.version || 'v1.0.0');
        
        return `
            <div class="card-module animate-up">
                <div class="card-inner">
                    <div class="card-head">
                        <span class="version-tag">${version}</span>
                    </div>
                    <h3 class="card-title">${title}</h3>
                    <p class="card-desc">${desc}</p>
                    <div class="card-footer">
                        <a href="${item.link}" class="link-action" target="_blank" rel="noopener">
                            Explore Source ➔
                        </a>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Render Section Header
     */
    createHeader(title, subtitle) {
        return `
            <header class="section-header">
                <h1 class="FS-H1">${DataEngine.sanitizeHTML(title)}</h1>
                <p class="section-sub">${DataEngine.sanitizeHTML(subtitle)}</p>
            </header>
        `;
    }
};
 
