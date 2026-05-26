import { fetchText }
from "../services/fetcher.js";

import { parseMarkdown }
from "../services/markdown.js";

import { openPanel }
from "./panel.js";

export async function openMarkdownViewer(
  item
) {

  try {

    const markdown =
      await fetchText(
        item.file
      );

    const html =
      parseMarkdown(markdown);

    openPanel(`
      <div class="markdown-view">
        ${html}
      </div>
    `);

  } catch (error) {

    console.error(error);

    openPanel(`
      <div class="markdown-view">
        Failed to load content.
      </div>
    `);

  }

} 
