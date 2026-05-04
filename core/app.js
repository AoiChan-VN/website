import SecurityLayer from './security/firewall.js';

const App = {
    init: async () => {
        SecurityLayer.init();
        await App.loadModule('plugins', 'plugin-list');
        await App.loadModule('resources', 'resource-list');
        await App.loadModule('youtube', 'video-list');
        await App.loadModule('downloads', 'download-list');
    },

    // Hàm load data riêng biệt, tránh xung đột
    fetchData: async (moduleName) => {
        try {
            const response = await fetch(`./data/${moduleName}.json`);
            if (!response.ok) throw new Error(`Lỗi scan data: ${moduleName}`);
            return await response.json();
        } catch (err) {
            console.error("Security Alert:", err);
            return [];
        }
    },

    loadModule: async (name, containerId) => {
        const data = await App.fetchData(name);
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = data.map(item => App.templates[name](item)).join('');
    },

    // Templates cho từng thiết bị (Responsive)
    templates: {
        plugins: (item) => `
            <div class="card p-4 border border-slate-700 rounded-lg">
                <h3 class="font-bold text-sky-400">${item.name}</h3>
                <p class="text-xs text-slate-400">Ver: ${item.version}</p>
                <a href="${item.link}" class="text-sm mt-2 block hover:underline italic">Xem chi tiết</a>
            </div>`,
        youtube: (item) => `
            <div class="video-card bg-black rounded overflow-hidden">
                <iframe class="w-full aspect-video" src="https://youtube.com{item.id}" frameborder="0" allowfullscreen></iframe>
                <p class="p-2 text-sm">${item.title}</p>
            </div>`,
        // Tương tự cho các module khác...
    }
};

document.addEventListener('DOMContentLoaded', App.init);
 
