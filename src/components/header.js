/**
 * @component Global Header Engine
 * @author AoiChan
 * @description Xử lý Render Header đồng bộ và tự động xác định Active Link
 */

export const renderHeader = (isSubPage = false) => {
    // 1. Xác định tiền tố đường dẫn dựa trên vị trí file gọi
    const pathPrefix = isSubPage ? '../' : './';
    
    // 2. Lấy tên file hiện tại từ URL để đánh dấu class 'active'
    const currentUrl = window.location.pathname;
    
    /**
     * Hàm kiểm tra xem link có đang active hay không
     * @param {string} fileName 
     */
    const isActive = (fileName) => {
        if (currentUrl.endsWith('/') && fileName === 'index.html') return 'active';
        return currentUrl.includes(fileName) ? 'active' : '';
    };

    // 3. Khởi tạo cấu trúc HTML
    const headerHTML = `
        <div class="container main-header">
            <div class="logo">
                AOI<span>CHAN</span>.SYS
            </div>
            
            <nav class="nav-pill">
                <a href="${pathPrefix}index.html" class="${isActive('index.html')}">
                    Home
                </a>
                <a href="${pathPrefix}pages/plugins.html" class="${isActive('plugins.html')}">
                    Plugins
                </a>
                <a href="${pathPrefix}pages/resource.html" class="${isActive('resource.html')}">
                    Resource
                </a>
                <a href="${pathPrefix}pages/channel.html" class="${isActive('channel.html')}">
                    Channel
                </a>
            </nav>

            <div class="header-auth" style="font-size: 10px; color: var(--border); letter-spacing: 1px;">
                V2.6_STABLE
            </div>
        </div>
    `;

    // 4. Tìm thẻ header và đổ dữ liệu vào
    const headerElement = document.querySelector('header');
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    } else {
        console.error("AoiChan Error: Không tìm thấy thẻ <header> trong HTML để render.");
    }
};

/**
 * Xuất dữ liệu phiên bản Header để kiểm soát tag version
 */
export const HEADER_VERSION = "1.2.0-Production";
