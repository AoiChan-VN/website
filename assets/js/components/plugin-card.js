export function createPluginCard(plugin) {
    const card = document.createElement("article");

    card.className = "plugin-card";

    const media = plugin.img.endsWith(".mp4")
        ? `<video src="${plugin.img}" controls></video>`
        : `<img src="${plugin.img}" alt="${plugin.name}">`;

    card.innerHTML = `
        ${media}

        <h2>${plugin.name}</h2>

        <p>${plugin.description}</p>

        <div class="actions">
            <a href="${plugin.link}">
                Chi Tiết
            </a>

            <a href="${plugin.download}" target="_blank">
                Download
            </a>
        </div>
    `;

    return card;
}