import { CardComponent } from './card.js';

export class PanelComponent {
    constructor(targetContainerId, onItemSelect) {
        this.container = document.getElementById(targetContainerId);
        this.onItemSelect = onItemSelect;
    }

    renderGrid(products) {
        if (!this.container) return;
        this.container.innerHTML = '';
        products.forEach(product => {
            const card = new CardComponent(product, this.onItemSelect);
            this.container.appendChild(card.render());
        });
    }
}
