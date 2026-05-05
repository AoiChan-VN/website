/**
 * @component Global Header
 * @author AoiChan
 */
export const renderHeader = (isSubPage = false) => {
    const pathPrefix = isSubPage ? '../' : './';
    const headerHTML = `
        <div class="container main-header">
            <div class="logo">AOI<span>CHAN</span></div>
            <nav class="nav-pill">
                <a href="${pathPrefix}index.html">Home</a>
                <a href="${pathPrefix}pages/plugins.html">Plugins</a>
                <a href="${pathPrefix}pages/resource.html">Resource</a>
                <a href="${pathPrefix}pages/channel.html">Channel</a>
            </nav>
        </div>
    `;
    const headerElement = document.querySelector('header');
    if (headerElement) headerElement.innerHTML = headerHTML;
};
 
