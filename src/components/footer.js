export const renderFooter = () => {
    const footerHTML = `
        <div class="container" style="padding: 30px 0; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; opacity: 0.5;">
            <div style="font-size: 10px; letter-spacing: 2px;">© 2026 AOICHAN INTERNATIONAL</div>
            <div style="display: flex; gap: 20px; font-size: 10px;">
                <a href="#" style="color:#fff; text-decoration:none;">GITHUB</a>
                <a href="#" style="color:#fff; text-decoration:none;">YOUTUBE</a>
            </div>
        </div>
    `;
    document.querySelector('footer').innerHTML = footerHTML;
};
