/**
 * Data Controller - Modular Data Handling
 */
const DataController = {
    async fetchData(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Data Fetch Error:", error);
            return null;
        }
    },

    renderGrid(containerId, data, templateFn) {
        const container = document.getElementById(containerId);
        if (!container || !data) return;

        container.innerHTML = data.map(item => templateFn(item)).join('');
    }
};
 
