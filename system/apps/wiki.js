import { Fetcher }
from "../utils/fetcher.js";

import { Indexer }
from "../data/indexer.js";

import { TagEngine }
from "../data/tags.js";

export async function createApp(){

  const root =
    document.createElement("div");

  root.style.display = "flex";

  root.style.height = "100%";

  const database =
    await Fetcher.json(
      "./database/wiki/index.json"
    );

  const documents = [];

  for(
    const item
    of database.documents
  ){

    const raw =
      await Fetcher.text(
        `./database/wiki/${item}`
      );

    const document = {

      id:item,

      title:item
        .replace(".md",""),

      content:raw,

      tags:["wiki"]
    };

    Indexer.add(document);

    TagEngine.add(
      "wiki",
      document
    );

    documents.push(document);

  }

  root.innerHTML = `
    <aside class="knowledge-sidebar"></aside>

    <section
      class="reader-content"
    >
      Select document
    </section>
  `;

  const sidebar =
    root.querySelector(
      ".knowledge-sidebar"
    );

  const content =
    root.querySelector(
      ".reader-content"
    );

  documents.forEach(
    document => {

      const item =
        document.createElement("div");

      item.className =
        "knowledge-item";

      item.innerHTML = `
        <div
          class="knowledge-item-title"
        >
          ${document.title}
        </div>

        <div
          class="knowledge-item-tags"
        >

          <div class="knowledge-tag">
            wiki
          </div>

        </div>
      `;

      item.addEventListener(
        "click",
        () => {

          content.innerHTML =
            document.content;

        }
      );

      sidebar.appendChild(item);

    }
  );

  return {

    id:"wiki",

    title:"Knowledge Wiki",

    element:root

  };

} 
