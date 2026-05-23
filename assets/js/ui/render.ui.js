import { createHeaderComponent } from '../components/header.component.js';
import { createCardComponent } from '../components/card.component.js';

export function renderApplication({ category, content }) {
    const app = document.getElementById('app');

    app.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const header = createHeaderComponent(category);

    fragment.append(header);

    const grid = document.createElement('section');

    grid.className = 'card-grid';

    content.forEach((item) => {
        const card = createCardComponent(item);

        grid.append(card);
    });

    fragment.append(grid);

    app.append(fragment);
} 
