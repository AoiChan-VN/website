const audio = document.getElementById('bg-audio') || document.createElement('audio');
audio.id = "bg-audio";
document.body.appendChild(audio);

// --- LOGIC SETTINGS ---
window.openSettings = () => {
    document.getElementById('settings-modal').style.display = 'flex';
};

window.closeSettings = () => {
    document.getElementById('settings-modal').style.display = 'none';
};

window.toggleTheme = () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mc_theme', theme);
};

// --- LOGIC NHẠC ---
window.toggleMusic = (isOn) => {
    if (isOn) {
        if (!audio.src) audio.src = document.getElementById('track-list').value;
        audio.play().catch(e => console.log("Cần tương tác để phát nhạc"));
    } else {
        audio.pause();
    }
};

window.changeTrack = (src) => {
    audio.src = src;
    if (document.getElementById('music-toggle').checked) audio.play();
};

// --- LOGIC ĐỌC FILE MD ---
window.viewDetail = async (mdPath) => {
    const response = await fetch(mdPath);
    const content = await response.text();
    // Tạo vùng hiển thị nội dung
    const viewer = document.getElementById('detail-viewer') || document.createElement('div');
    viewer.id = 'detail-viewer';
    viewer.className = 'modal-overlay';
    viewer.style.display = 'flex';
    viewer.innerHTML = `
        <div class="modal-content card" style="max-height:80vh; overflow-y:auto; width:80%;">
            <div style="white-space: pre-wrap; font-family: sans-serif; text-align:left;">${content}</div>
            <button onclick="this.parentElement.parentElement.remove()" class="btn-primary" style="margin-top:20px;">Đóng bài viết</button>
        </div>
    `;
    document.body.appendChild(viewer);
};
