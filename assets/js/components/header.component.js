export function createHeaderComponent(category) {
    const header = document.createElement('header');

    header.className = 'app-header';

    header.innerHTML = `
        <div class="app-header__overlay"></div>

        <img
            class="app-header__banner"
            src="${category.banner}"
            alt="${category.title}"
        >

        <div class="app-header__content">
            <img
                class="app-header__icon"
                src="${category.icon}"
                alt="${category.name}"
            >

            <h1 class="app-header__title">
                ${category.title}
            </h1>
        </div>
    `;

    return header;
} 
