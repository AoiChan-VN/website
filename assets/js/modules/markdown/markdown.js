/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { renderMarkdown }
from "../../core/markdown.js";

import { markdownTemplate }
from "./markdown.template.js";

export function renderMarkdownBlock({

  target,

  markdown

}) {

  const html =
    renderMarkdown(markdown);

  target.innerHTML =
    markdownTemplate(html);

} 
