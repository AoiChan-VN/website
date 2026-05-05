/**
 * @core System Logic
 * Chuẩn Senior: Tự động hóa render và quản lý ID
 */
class AoiSystem {
    constructor() {
        this.initSecurity();
        console.log("AoiChan Framework Initialized...");
    }

    initSecurity() {
        // Chống chuột phải, F12, copy
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.onkeydown = e => {
            if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode))) return false;
        };
    }

    // Render Database ra giao diện theo chuẩn ID/Name SEO
    renderList(containerId, db) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const html = db.data.map(item => `
            <div class="item-card" id="${item.id}" data-version="${db.tag}">
                <h3>${item.name}</h3>
                <span>Ver: ${item.ver}</span>
                <p>Auth: ${db.author}</p>
            </div>
        `).join('');
        container.innerHTML = html;
    }
}
export const App = new AoiSystem();
 
