import { createElement } from "./utils.js";
import { openPanel } from "./modal.js";
import { fetchText } from "./api.js";
import { parseMarkdown } from "./markdown.js";

export function renderCards(cards){

  const container =
    document.getElementById("cards-container");

  container.innerHTML = "";

  cards.forEach((item) => {

    const card = createElement("article", "card");

    const image =
      createElement("img", "card-image");

    image.src = item.img;
    image.alt = item.name;
    image.loading = "lazy";

    const body =
      createElement("div", "card-body");

    const title =
      createElement("h2", "card-title");

    title.textContent = item.name;

    const description =
      createElement(
        "p",
        "card-description"
      );

    description.textContent =
      item.description;

    const actions =
      createElement(
        "div",
        "card-actions"
      );

    const button =
      createElement(
        "button",
        "card-button"
      );

    button.type = "button";
    button.textContent = "•••";

    button.addEventListener(
      "click",
      async () => {

        let markdown = "";

        if(item.file){

          try{
            markdown =
              await fetchText(item.file);
          }catch(error){
            markdown =
              "# Error\nKhông tải được file.";
          }
        }

        const html = `
          <h2>${item.name}</h2>

          <div class="markdown-content">
            ${parseMarkdown(markdown)}
          </div>

          ${
            item.link
            ? `
              <a
                class="panel-link"
                href="${item.link}"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Link
              </a>
            `
            : ""
          }
        `;

        openPanel(html);
      }
    );

    actions.append(button);

    body.append(
      title,
      description,
      actions
    );

    card.append(
      image,
      body
    );

    container.append(card);

  });
} 
