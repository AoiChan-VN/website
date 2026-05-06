/**
 * @component Global Footer Engine
 * @author AoiChan
 * @description Render hệ thống chân trang đồng bộ
 */
export const renderFooter = () => {
    const footerHTML = `
        <div class="container" style="padding: 30px 0; border-top: 1px solid rgba(255,255,255,0.03); display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 11px; color: #444; letter-spacing: 2px;">© 2026 AOICHAN</div>
            <div class="footer-links" style="display: flex; gap: 20px;">
                <a href="#" style="color: #666; font-size: 10px; text-decoration: none;">GITHUB</a>
                <a href="#" style="color: #666; font-size: 10px; text-decoration: none;">YOUTUBE</a>
            </div>
        </div>
    `;
    document.querySelector('footer').innerHTML = footerHTML;
};
