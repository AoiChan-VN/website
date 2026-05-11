import Component from "../../core/Component.js";

export default class Card extends Component {
  constructor(data, panel) {
    super();

    this.data = data;
    this.panel = panel;
  }

  async init() {
    await this.loadStyle(
      "./src/components/Card/Card.css"
    );

    this.render();
  }

  render() {
    const card = this.createElement("article", "card");

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img
          class="card-image"
          src="${this.data.image}"
          alt="${this.data.title}"
        />
      </div>

      <div class="card-content">
        <p class="card-label">PROJECT</p>
        <h2 class="card-title">${this.data.title}</h2>
        <p class="card-desc">${this.data.desc}</p>
      </div>
    `;

    const image = card.querySelector(".card-image");

    image.onload = () => {
      image.classList.add("loaded");
    };

    card.addEventListener("click", () => {
      this.panel.open(this.data.dataPath);
    });

    this.element = card;
  }
} 
