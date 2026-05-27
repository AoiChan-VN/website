import { fetchText }
from "./fetch.js";

import {
  parseMarkdown
}
from "../modules/markdown.js";

export async function getMarkdown(
  path
) {

  if (!path) {

    return `
      <section class="empty-state">

        <h2>
          Missing Markdown Path
        </h2>

      </section>
    `;

  }

  try {

    const markdown =
      await fetchText(path);

    return parseMarkdown(
      markdown
    );

  } catch (error) {

    console.error(error);

    return `
      <section class="error-view">

        <div class="error-code">
          MD
        </div>

        <h2 class="error-title">
          Markdown Load Failed
        </h2>

      </section>
    `;

  }

}
