function renderCards(items){

  const container =
    document.getElementById(
      "cards-container"
    );

  container.innerHTML = "";

  items.forEach(item => {

    const card =
      createElement("article","card");

    const imageWrapper =
      createElement("div","card-image");

    const image =
      createElement("img");

    image.src =
      item.img ||
      "./assets/images/placeholder.webp";

    image.alt =
      item.name;

    imageWrapper.appendChild(image);

    const content =
      createElement("div","card-content");

    const title =
      createElement("h2","card-title");

    title.textContent =
      item.name;

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
      () => openPanel(item)
    );

    actions.appendChild(button);

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(actions);

    card.appendChild(imageWrapper);
    card.appendChild(content);

    container.appendChild(card);

  });

}
