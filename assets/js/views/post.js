import { getMarkdown }
from "../services/content.js";

import { loadContent }
from "../services/database.js";

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

  const html =
    await getMarkdown(
      target.file
    );

  const article =
    document.createElement(
      "article"
    );

  article.className =
    "markdown observe";

  article.innerHTML =
    html;

  root.appendChild(
    article
  );

} 
