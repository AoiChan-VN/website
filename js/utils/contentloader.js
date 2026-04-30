export async function loadMarkdown(fileName) {
    try {
        const response = await fetch(`./content/${fileName}`);
        if (!response.ok) throw new Error("Không tìm thấy bài viết.");
        const text = await response.text();
        
        // Hiển thị nội dung vào một vùng chỉ định
        const viewer = document.getElementById('md-viewer');
        viewer.innerHTML = `<pre style="white-space: pre-wrap; font-family: inherit;">${text}</pre>`;
        document.getElementById('md-modal').style.display = 'flex';
    } catch (err) {
        console.error(err);
    }
}
 
