import { fetchJson } from "./fetch-json.js";
import { createCard } from "./create-card.js";

export async function loadPortfolio() {

  const container =
    document.getElementById("portfolio-grid");

  if (!container) {
    return;
  }

  try {

    const folders =
      await fetchJson("./data/aoi-file.json");

    for (const folder of folders) {

      const items =
        await fetchJson(folder.file);

      items.forEach((item) => {

        const card =
          createCard(item);

        container.appendChild(card);

      });

    }

  } catch (error) {

    console.error(error);

    container.innerHTML = `
      <div class="glass-card" style="padding:24px;border-radius:24px;">
        Failed to load data.
      </div>
    `;

  }

} 
