export class Panel {

  static init() {

    this.panel = document.getElementById('panel-viewer');

    this.content = document.getElementById('panel-content');

    this.closeButton = document.getElementById('panel-close');

    this.closeButton.addEventListener('click', () => {
      this.close();
    });

    this.panel.addEventListener('click', (event) => {

      if (
        event.target.classList.contains('panel-viewer') ||
        event.target.classList.contains('panel-viewer__backdrop')
      ) {
        this.close();
      }
    });
  }

  static async open(path) {

    try {

      const response = await fetch(path);

      if (!response.ok) {
        throw new Error('Cannot load panel data');
      }

      const data = await response.json();

      this.render(data);

      this.panel.classList.add('panel-viewer--active');

      document.body.style.overflow = 'hidden';

    } catch (error) {

      console.error(error);
    }
  }

  static close() {

    this.panel.classList.remove('panel-viewer--active');

    document.body.style.overflow = '';
  }

  static render(data) {

    const items = data.content.map(item => `
      <div class="panel-info">

        <span class="panel-info__label">
          ${item.label}
        </span>

        <span class="panel-info__value">
          ${item.value}
        </span>

      </div>
    `).join('');

    this.content.innerHTML = `
      <div class="panel-banner">
        <img
          src="${data.banner}"
          alt="${data.title}"
          class="panel-banner__image"
        >
      </div>

      <div class="panel-data">

        <h2 class="panel-data__title">
          ${data.title}
        </h2>

        <div class="panel-data__grid">
          ${items}
        </div>

      </div>
    `;
  }
} 
