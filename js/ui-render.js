(function() {
    const grid = document.getElementById('portfolio-grid');
    const panel = document.getElementById('details-panel');
    const panelBody = document.getElementById('panel-body');
    const closePanel = document.getElementById('close-panel');

    if (closePanel) {
        closePanel.addEventListener('click', () => {
            panel.classList.add('hidden');
        });
    }

    window.renderCards = function(items) {
        if (!grid) return;
        grid.innerHTML = '';
        
        if (!items || items.length === 0) {
            grid.innerHTML = '<p>Không có dữ liệu hiển thị.</p>';
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="card-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://w3.org\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'><rect width=\'100\' height=\'100\' fill=\'%23334155\'/><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' fill=\'%2394a3b8\'>No Image</text></svg>'">
                <div class="card-content">
                    <div>
                        <h3 class="card-title">${item.name}</h3>
                        <p class="card-desc">${item.description}</p>
                    </div>
                    <button class="action-btn" aria-label="Chi tiết">&#8226;&#8226;&#8226;</button>
                </div>
            `;
            
            const btn = card.querySelector('.action-btn');
            if (btn) {
                btn.addEventListener('click', () => openDetails(item));
            }
            grid.appendChild(card);
        });
    };

    async function openDetails(item) {
        if (!panelBody || !panel) return;
        
        panelBody.innerHTML = `
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            ${item.link ? `<a href="${item.link}" target="_blank" class="download-link">Liên kết ngoài</a>` : ''}
            <div id="md-content" class="panel-md">Đang tải nội dung...</div>
        `;
        
        panel.classList.remove('hidden');

        if (item.file) {
            try {
                const res = await fetch(item.file);
                if (!res.ok) throw new Error();
                const mdText = await res.text();
                if (window.parseMarkdown) {
                    document.getElementById('md-content').innerHTML = window.parseMarkdown(mdText);
                } else {
                    document.getElementById('md-content').innerText = mdText;
                }
            } catch (e) {
                document.getElementById('md-content').innerHTML = '<p style="color:red;">Không thể tải file nội dung chi tiết.</p>';
            }
        } else {
            document.getElementById('md-content').innerHTML = '';
        }
    }
})();
