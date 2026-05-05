/**
 * @component Global Footer Engine
 * @author AoiChan
 * @description Render hệ thống chân trang đồng bộ
 */

export const renderFooter = () => {
    // 1. Cấu hình thông tin Social Media (Bạn có thể sửa link ở đây)
    const socialLinks = [
        { name: 'GITHUB', url: 'https://github.com' },
        { name: 'YOUTUBE', url: 'https://youtube.com' },
        { name: 'FACEBOOK', url: 'https://facebook.com' },
        { name: 'EMAIL', url: 'mailto:contact@aoichan.vn' }
    ];

    // 2. Tự động lấy năm hiện tại
    const currentYear = new Date().getFullYear();

    // 3. Xây dựng cấu trúc HTML
    const footerHTML = `
        <div class="container animate" style="padding-top: 80px; padding-bottom: 50px;">
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; border-top: 1px solid var(--border); padding-top: 40px;">
                
                <!-- Nhãn hiệu và Slogan -->
                <div class="footer-brand">
                    <div class="logo" style="margin-bottom: 10px;">AOI<span>CHAN</span>.SYS</div>
                    <p style="color: #444; font-size: 13px; max-width: 300px;">
                        Hệ thống Portfolio cao cấp được thiết kế cho sự bền vững và tốc độ tối đa.
                    </p>
                </div>

                <!-- Social Links -->
                <div class="footer-social" style="display: flex; gap: 25px;">
                    ${socialLinks.map(link => `
                        <a href="${link.url}" target="_blank" style="color: #888; text-decoration: none; font-size: 11px; letter-spacing: 2px; font-weight: 700; transition: 0.3s;" 
                           onmouseover="this.style.color='var(--accent)'" 
                           onmouseout="this.style.color='#888'">
                           ${link.name}
                        </a>
                    `).join('')}
                </div>
            </div>

            <!-- Bản quyền & Version -->
            <div style="margin-top: 50px; display: flex; justify-content: space-between; align-items: center; opacity: 0.4;">
                <div class="auth-label" style="letter-spacing: 4px; font-size: 10px;">
                    © ${currentYear} INTERNATIONAL MIT LICENSE | AUTHORS: AOICHAN
                </div>
                <div class="sys-status" style="font-size: 10px; display: flex; align-items: center; gap: 10px;">
                    <span style="width: 6px; height: 6px; background: var(--accent); border-radius: 50%; box-shadow: 0 0 5px var(--accent);"></span>
                    SYSTEM_ONLINE_V2.6.4
                </div>
            </div>
        </div>
    `;

    // 4. Tìm thẻ footer và đổ dữ liệu vào
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
    } else {
        console.warn("AoiChan Warning: Không tìm thấy thẻ <footer> để render.");
    }
};
