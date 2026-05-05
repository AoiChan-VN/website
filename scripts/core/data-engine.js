/**
 * Core Data Engine for fetching and sanitizing internal JSON DB
 */
export const DataEngine = {
    /**
     * Sanitize string to prevent XSS
     * @param {string} str 
     * @returns {string}
     */
    sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    /**
     * Fetch data from local versioned DB
     * @param {string} collection - Name of the json file (e.g., 'plugins')
     * @returns {Promise<Array|Object>}
     */
    async fetchData(collection) {
        const VERSION = 'v1.0.0';
        try {
            const response = await fetch(`./data/${VERSION}/${collection}.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`DataEngine Error [${collection}]:`, error);
            return null;
        }
    }
};
 
