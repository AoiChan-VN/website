document.addEventListener('DOMContentLoaded', async () => {
    if (window.loadProjectData && window.renderCards) {
        const data = await window.loadProjectData();
        window.renderCards(data);
    } else {
        console.error("Hệ thống core script bị thiếu hoặc tải sai thứ tự.");
    }
});
