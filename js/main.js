window.openSettings = () => document.getElementById('settings-modal').style.display = 'flex';
window.closeSettings = () => document.getElementById('settings-modal').style.display = 'none';

window.toggleTheme = () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

window.viewDetail = async (mdPath) => {
    try {
        const res = await fetch(mdPath);
        const content = await res.text();
        const viewer = document.createElement('div');
        viewer.className = 'modal-overlay';
        viewer.id = 'md-viewer';
        viewer.innerHTML = `
            <div class="card" style="width:85%; max-height:85vh; overflow-y:auto; padding:35px;">
                <div style="white-space: pre-wrap; text-align:left;">${content}</div>
                <button onclick="document.getElementById('md-viewer').remove()"
                class="btn-primary" style="margin-top:25px; background:#ff4444;">Thoát</button>
            </div>`;
        document.body.appendChild(viewer);
    } catch (e) { alert("Lỗi tải nội dung!"); }
};

document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
