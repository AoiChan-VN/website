import { loadProjectData } from './data-loader.js';
import { renderCards } from './ui-render.js';

document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadProjectData();
    renderCards(data);
});
 
