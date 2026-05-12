import { Fetcher }
from "../../system/utils/fetcher.js";

export async function createApp(){

  const root =
    document.createElement("div");

  root.className =
    "explorer-app";

  const database =
    await Fetcher.json(
      "./database/profile.json"
    );

  const profiles = [];

  for(
    const item
    of database.items
  ){

    const profile =
      await Fetcher.json(
        `./database/${database.dataset}/${item}.json`
      );

    profiles.push(profile);

  }

  root.innerHTML = `
    <aside class="explorer-sidebar">

      <div class="explorer-sidebar-header">
        Collections
      </div>

      <nav class="explorer-nav">

        <div
          class="explorer-item active"
        >
          Fantasy
        </div>

      </nav>

    </aside>

    <section class="explorer-content">

      <div class="explorer-toolbar">

        <div class="explorer-path">
          /database/fantasy
        </div>

      </div>

      <div class="explorer-grid">

        ${
          profiles.map(
            profile => `
              <article
                class="explorer-card"
              >

                <div
                  class="explorer-card-cover"
                >

                  <img
                    src="${profile.avatar}"
                    alt="${profile.name}"
                  >

                </div>

                <div
                  class="explorer-card-body"
                >

                  <div
                    class="explorer-card-title"
                  >
                    ${profile.name}
                  </div>

                </div>

              </article>
            `
          ).join("")
        }

      </div>

    </section>
  `;

  return {

    id:"explorer",

    title:"Explorer",

    element:root

  };

} 
