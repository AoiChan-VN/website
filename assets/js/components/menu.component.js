export function createMenuComponent(item) {
    const wrapper = document.createElement('div');

    wrapper.className = 'card-menu';

    const button = document.createElement('button');

    button.className = 'card-menu__button';

    button.type = 'button';

    button.textContent = '+';

    const popup = document.createElement('div');

    popup.className = 'card-menu__popup';

    popup.innerHTML = `
        <a
            class="card-menu__item"
            href="${item.download}"
            target="_blank"
            rel="noopener noreferrer"
        >
            Download
        </a>

        <a
            class="card-menu__item"
            href="${item.website}"
            target="_blank"
            rel="noopener noreferrer"
        >
            Website
        </a>

        <a
            class="card-menu__item"
            href="${item.information}"
            target="_blank"
        >
            Information
        </a>
    `;

    button.addEventListener('click', () => {
        popup.classList.toggle('card-menu__popup--active');
    });

    wrapper.append(button);
    wrapper.append(popup);

    return wrapper;
} 
