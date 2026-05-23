import { createMenuComponent } from './menu.component.js';

export function createCardComponent(item) {
    const card = document.createElement('article');

    card.className = 'card';

    card.innerHTML = `
        <div class="card__image-wrapper">
            <img
                class="card__image"
                src="${item.img}"
                alt="${item.name}"
            >
        </div>

        <div class="card__content">
            <h2 class="card__title">
                ${item.name}
            </h2>

            <p class="card__meta">
                ${item.type} · ${item.version}
            </p>
        </div>
    `;

    const menu = createMenuComponent(item);

    card.append(menu);

    return card;
} 
