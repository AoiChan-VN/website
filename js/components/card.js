export class CardComponent {
    constructor(product, onDetailsClick) {
        this.product = product;
        this.onDetailsClick = onDetailsClick;
    }

    htmlToElement(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstChild;
    }

    render() {
        const cardHtml = `
            <div class="card" data-id="${this.product.id}">
                <img class="card-img" src="${this.product.img}" alt="${this.product.name}" onerror="this.src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; this.style.backgroundImage='var(--card-fallback-img)';">
                <div class="card-body">
                    <h3>${this.product.name}</h3>
                    <button class="card-action-btn">⋮</button>
                </div>
                <div class="action-menu">
                    <button class="menu-info-btn">Thông tin</button>
                    <button class="menu-dl-btn">Download</button>
                </div>
            </div>
        `;

        const element = this.htmlToElement(cardHtml);
        const actionBtn = element.querySelector('.card-action-btn');
        const menu = element.querySelector('.action-menu');

        // Logic toggle menu con dạng popup (...)
        actionBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.action-menu').forEach(m => { if(m !== menu) m.classList.remove('active'); });
            menu.classList.toggle('active');
        });

        // Event xử lý trong menu con
        element.querySelector('.menu-info-btn').addEventListener('click', () => {
            menu.classList.remove('active');
            this.onDetailsClick(this.product);
        });

        element.querySelector('.menu-dl-btn').addEventListener('click', () => {
            menu.classList.remove('active');
            window.open(this.product.link, '_blank');
        });

        return element;
    }
}
 
