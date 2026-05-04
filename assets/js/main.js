document.addEventListener('DOMContentLoaded', async () => {
    // 1. Xử lý bảo mật liên hệ
    const btnContact = document.getElementById('btn-reveal-contact');
    if (btnContact) {
        btnContact.addEventListener('click', () => {
            const secret = "YWRtaW5AZXhhbXBsZS5jb20="; // Base64 của email
            btnContact.innerText = SecurityEngine.revealContact(secret);
            btnContact.classList.replace('bg-blue-600', 'bg-emerald-600');
        });
    }

    // 2. Load dự liệu mẫu cho Trang chủ (VD: lấy từ plugins.json)
    const plugins = await DataController.fetchData('./data/plugins.json');
    
    if (plugins) {
        DataController.renderGrid('featured-grid', plugins.slice(0, 3), (item) => `
            <div class="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-blue-500 transition">
                <span class="text-xs font-mono text-blue-400 uppercase tracking-widest">${SecurityEngine.sanitizeHTML(item.category)}</span>
                <h3 class="text-xl font-bold mt-2 mb-4">${SecurityEngine.sanitizeHTML(item.name)}</h3>
                <p class="text-gray-500 text-sm mb-6">${SecurityEngine.sanitizeHTML(item.description)}</p>
                <a href="${item.link}" class="text-blue-500 font-semibold hover:underline">View Project &rarr;</a>
            </div>
        `);
    }
});
 
