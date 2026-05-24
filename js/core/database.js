export class DatabaseEngine {
    constructor() {
        this.treePath = './database/aoi_tree.json';
        this.folderBasePath = './database';
    }

    async fetchTree() {
        const response = await fetch(this.treePath);
        return await response.json();
    }

    async loadFolderData(folderName, fileName = 'aoi_plugins.json') {
        const response = await fetch(`${this.folderBasePath}/${folderName}/${fileName}`);
        return await response.json();
    }

    async fetchAllProducts() {
        const tree = await this.fetchTree();
        let aggregateData = [];
        for (const item of tree) {
            try {
                const data = await this.loadFolderData(item.folder);
                aggregateData = [...aggregateData, ...data];
            } catch (error) {
                console.error(`Error mapping folder: ${item.folder}`, error);
            }
        }
        return aggregateData;
    }
}
