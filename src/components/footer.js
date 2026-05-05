/**
 * @component Global Footer
 * @author AoiChan
 */
export const renderFooter = () => {
    const footerHTML = `
        <div class="container" style="text-align: center; padding: 50px 0; opacity: 0.4;">
            <div class="auth-label" style="letter-spacing: 3px; font-size: 12px;">DESIGNED & ENGINEERED BY AOICHAN</div>
            <p style="font-size: 10px; margin-top: 10px;">© 2026 INTERNATIONAL LICENSE | ALL RIGHTS RESERVED</p>
        </div>
    `;
    const footerElement = document.querySelector('footer');
    if (footerElement) footerElement.innerHTML = footerHTML;
};
 
