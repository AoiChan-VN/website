import { requestJSON } from '../utils/request.js';

export async function loadFolderRegistry(folderName) {
    const registry = await requestJSON(`./data/${folderName}/index.json`);

    const requests = registry.map((fileName) => {
        return requestJSON(`./data/${folderName}/${fileName}`);
    });

    const response = await Promise.all(requests);

    return response.flat();
} 
