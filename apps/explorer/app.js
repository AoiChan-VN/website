import { Fetcher }
from "../../system/utils/fetcher.js";

import { VirtualList }
from "../../system/components/virtual-list.js";

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
          data-collection="fantasy"
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

      <div
        class="explorer-grid virtual-grid"
      ></div>

    </section>
  `;

  const grid =
    root.querySelector(
      ".virtual-grid"
    );

  new VirtualList({

    container:grid,

    items:profiles,

    itemHeight:260,

    renderItem(profile){

      const node =
        document.createElement("article");

      node.className =
        "explorer-card";

      node.dataset.profile =
        profile.id;

      node.innerHTML = `
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
      `;

      node.addEventListener(
        "click",
        () => {

          console.log(
            "[EXPLORER OPEN]",
            profile.id
          );

        }
      );

      return node;

    }

  });

  bindSidebar(root);

  return {

    id:"explorer",

    title:"Explorer",

    element:root

  };

}

function bindSidebar(root){

  const items =
    root.querySelectorAll(
      ".explorer-item"
    );

  for(const item of items){

    item.addEventListener(
      "click",
      () => {

        items.forEach(
          nav => {

            nav.classList.remove(
              "active"
            );

          }
        );

        item.classList.add(
          "active"
        );

      }
    );

  }

}
