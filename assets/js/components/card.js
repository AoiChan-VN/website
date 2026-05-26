import { createPanel }
from "./panel.js";

export function createCard(item){

  const article =
    document.createElement("article");

  article.className = "card";

  const image =
    document.createElement("img");

  image.className = "card-image";

  image.src = item.img;

  image.alt = item.name;

  image.loading = "lazy";

  const content =
    document.createElement("div");

  content.className =
    "card-content";

  const title =
    document.createElement("h2");

  title.className =
    "card-title";

  title.textContent =
    item.name;

  const description =
    document.createElement("p");

  description.className =
    "card-description";

  description.textContent =
    item.description;

  const actions =
    document.createElement("div");

  actions.className =
    "card-actions";

  const button =
    document.createElement("button");

  button.className =
    "card-button";

  button.type = "button";

  button.textContent = "•••";

  const panel =
    createPanel(item);

  button.addEventListener(
    "click",
    () => {
      panel.classList.toggle(
        "active"
      );
    }
  );

  actions.appendChild(button);

  content.append(
    title,
    description,
    actions
  );

  article.append(
    image,
    content,
    panel
  );

  return article;
}
