import Component from "../../core/Component.js";

export default class Panel extends Component {
  constructor() {
    super();

    this.root =
      document.getElementById("panel-root");

    this.panel = null;
  }

  async open(path) {
    await this.loadStyle(
      "./src/components/Panel/Panel.css"
    );

    this.renderSkeleton();

    const response = await fetch(path);

    const data = await response.json();

    this.render(data);
  }

  renderSkeleton() {
    this.root.innerHTML = `
      <div class="panel-overlay active">
        <div class="panel skeleton-panel"></div>
      </div>
    `;
  }

  render(data) {
    this.root.innerHTML = `
      <div class="panel-overlay active">
        <div class="panel">
          <button class="panel-close">
            ✕
          </button>

          <div class="panel-body">
            <h2>${data.title}</h2>

            <p class="panel-description">
              ${data.description}
            </p>

            <div class="panel-tags">
              ${data.tags
                .map(
                  (tag) =>
                    `<span class="tag">${tag}</span>`
                )
                .join("")}
            </div>

            <div class="panel-gallery">
              ${data.gallery
                .map(
                  (img) => `
                    <img src="${img}" />
                  `
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const overlay =
      this.root.querySelector(".panel-overlay");

    const close =
      this.root.querySelector(".panel-close");

    close.addEventListener("click", () => {
      overlay.classList.remove("active");

      setTimeout(() => {
        this.root.innerHTML = "";
      }, 500);
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        close.click();
      }
    });
  }
} 
