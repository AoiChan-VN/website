import { loadTreeRegistry } from '../services/tree.service.js';
import { loadFolderRegistry } from '../services/data.service.js';
import { renderApplication } from '../ui/render.ui.js';

export async function initializeApplication() {
    const tree = await loadTreeRegistry();

    const category = tree[0];

    const content = await loadFolderRegistry(category.folder);

    renderApplication({
        category,
        content
    });
} 
