// Khởi tạo các hàm toàn cục để HTML có thể gọi được thông qua onclick
window.openSettings = () => document.getElementById('settings-modal').style.display = 'flex';
window.closeSettings = () => document.getElementById('settings-modal').style.display = 'none';

window.toggleTheme = () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

window.toggleMusic = (isOn) => {
    const audio = document.getElementById('bg-audio');
    if (isOn) {
        if (!audio.src) audio.src = document.getElementById('track-list').value;
        audio.play().catch(() => alert("Vui lòng click bất kỳ đâu trên trang để kích hoạt nhạc!"));
    } else {
        audio.pause();
    }
};

window.changeTrack = (src) => {
    const audio = document.getElementById('bg-audio');
    audio.src = src;
    if (document.getElementById('music-toggle').checked) audio.play();
};

window.viewDetail = async (mdPath) => {
    try {
        const response = await fetch(mdPath);
        if(!response.ok) throw new Error("Không thấy file .md");
        const content = await response.text();
        const viewer = document.createElement('div');
        viewer.className = 'modal-overlay';
        viewer.id = 'md-viewer';
        viewer.innerHTML = `
            <div class="card" style="width:80%; max-height:80vh; overflow-y:auto; padding:30px; text-align:left;">
                <div style="white-space: pre-wrap; font-family: sans-serif; line-height:1.8;">${content}</div>
                <button onclick="document.getElementById('md-viewer').remove()" class="btn-primary" style="margin-top:20px; background:#ff4444;">Đóng bài viết</button>
            </div>`;
        document.body.appendChild(viewer);
    } catch (err) {
        alert("Lỗi: " + err.message);
    }
};

// Thiết lập theme mặc định
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
