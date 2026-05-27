import { getMarkdown }
from "../services/content.js";

import { loadContent }
from "../services/database.js";

import { reveal }
from "../modules/reveal.js";

import { updateMeta }
from "../modules/meta.js";

export async function renderPost(
  root,
  segments
) {

  const id =
    segments[1];

  if (!id) {

    root.innerHTML = `
      <section class="empty-state">

        <h2>
          Missing Post ID
        </h2>

      </section>
    `;

    return;

  }

  const database =
    await loadContent();

  const target =
    database.find(
      (item) => item.id === id
    );

  if (!target) {

    root.innerHTML = `
      <section class="empty-state">

        <h2>
          Post Not Found
        </h2>

      </section>
    `;

    return;

  }

  updateMeta({
    title:
      target.title
      || target.id,

    description:
      target.description
    || "Aoi Content"
  });

  const html =
    await getMarkdown(
      target.file
    );

  const article =
    document.createElement(
      "article"
    );

  article.className =
    "markdown reveal-item";

  article.innerHTML =
    html;

  root.appendChild(
    article
  );

  reveal([article]);

}
