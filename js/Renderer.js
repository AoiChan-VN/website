import { Panel } from './Panel.js';

export class Renderer {

  static renderCards(data = []) {

    const container = document.getElementById('card-container');

    container.innerHTML = '';

    data.forEach(item => {

      const card = this.createCard(item);

      container.appendChild(card);
    });
  }

  static createCard(item) {

    const article = document.createElement('article');

    article.className = 'profile-card';

    article.innerHTML = `
      <div class="profile-card__image-wrapper">
        <img
          class="profile-card__image"
          src="${item.thumbnail}"
          alt="${item.title}"
        >
      </div>

      <div class="profile-card__body">
        <h2 class="profile-card__title">
          ${item.title}
        </h2>

        <p class="profile-card__description">
          ${item.description}
        </p>
      </div>
    `;

    article.addEventListener('click', () => {
      Panel.open(item.panel);
    });

    return article;
  }
} 
