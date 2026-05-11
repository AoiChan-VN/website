export default class Component {
  constructor() {
    this.element = null;
  }

  async loadStyle(path) {
    const exists = document.querySelector(
      `link[data-style="${path}"]`
    );

    if (exists) return;

    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = path;
    link.dataset.style = path;

    document.head.appendChild(link);

    await new Promise((resolve) => {
      link.onload = resolve;
    });
  }

  createElement(tag, className = "") {
    const el = document.createElement(tag);

    if (className) {
      el.className = className;
    }

    return el;
  }
} 
