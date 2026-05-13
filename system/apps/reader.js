import { MarkdownRuntime }
from "../data/markdown.js";

export async function createApp({
  title,
  content
}){

  const root =
    document.createElement("div");

  root.className =
    "reader-app";

  root.innerHTML = `
    <div class="reader-toolbar">

      <div class="reader-title">
        ${title}
      </div>

    </div>

    <article class="reader-content">
      ${MarkdownRuntime.render(content)}
    </article>
  `;

  return {

    id:"reader",

    title,

    element:root

  };

} 
