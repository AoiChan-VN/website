/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import {
  renderMarkdownBlock
}
from "../modules/markdown/markdown.js";

export async function renderDocsPage(
  root
) {

  const markdown = `

# Documentation

## Plugin Architecture

Advanced Minecraft plugin
infrastructure ecosystem.

### Features

- Dynamic Loader
- Schema Validator
- SEO Engine
- Dashboard Metrics

## Example

\`\`\`js
console.log("AoiChan");
\`\`\`

`;

  root.innerHTML = `

    <section class="docs-page">

      <div
        class="docs-container"
        id="docs-container"
      ></div>

    </section>

  `;

  const target =
    document.getElementById(
      "docs-container"
    );

  renderMarkdownBlock({

    target,

    markdown

  });

} 
