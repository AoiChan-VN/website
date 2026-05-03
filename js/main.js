window.openSettings = () => document.getElementById('settings-modal').style.display = 'flex';
window.closeSettings = () => document.getElementById('settings-modal').style.display = 'none';
window.toggleTheme = () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
};
window.viewDetail = async (path) => {
    const res = await fetch(path);
    const txt = await res.text();
    const div = document.createElement('div');
    div.className = 'modal-overlay';
    div.innerHTML = `<div class="card" style="padding:30px; width:80%; max-height:80vh; overflow:auto;">
        <div style="white-space:pre-wrap;">${txt}</div>
        <button onclick="this.parentElement.parentElement.remove()" class="btn-primary" style="margin-top:20px; background:#ff4444;">Đóng</button>
    </div>`;
    document.body.appendChild(div);
};
document.addEventListener('contextmenu', e => e.preventDefault());
