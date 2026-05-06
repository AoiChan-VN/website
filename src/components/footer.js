export const renderFooter = () => {
    const year = new Date().getFullYear();
    return `
    <footer style="margin-top: 5rem; padding: 2rem 0; border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
        <div class="container">
            <p>&copy; ${year} <strong>AoiChan</strong>. All Rights Reserved.</p>
            <p style="font-size: 0.8rem; opacity: 0.6; margin-top: 10px;">
                Designed & Built with High-End Performance by Senior Developer.
            </p>
            <div class="social-links" style="margin-top: 15px;">
                <a href="#" style="margin: 0 10px;">GitHub</a>
                <a href="#" style="margin: 0 10px;">YouTube</a>
                <a href="#" style="margin: 0 10px;">Discord</a>
            </div>
        </div>
    </footer>`;
};
