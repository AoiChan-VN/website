/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

export function renderMarkdown(
  markdown = ""
) {

  let html =
    markdown;

  html =
    parseHeadings(html);

  html =
    parseBold(html);

  html =
    parseItalic(html);

  html =
    parseCodeBlocks(html);

  html =
    parseInlineCode(html);

  html =
    parseLists(html);

  html =
    parseLinks(html);

  html =
    parseParagraphs(html);

  return html;

}

function parseHeadings(content) {

  return content

    .replace(
      /^### (.*$)/gim,
      "<h3>$1</h3>"
    )

    .replace(
      /^## (.*$)/gim,
      "<h2>$1</h2>"
    )

    .replace(
      /^# (.*$)/gim,
      "<h1>$1</h1>"
    );

}

function parseBold(content) {

  return content.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );

}

function parseItalic(content) {

  return content.replace(
    /\*(.*?)\*/g,
    "<em>$1</em>"
  );

}

function parseCodeBlocks(
  content
) {

  return content.replace(
    /```([\s\S]*?)```/g,
    `<pre class="markdown-pre">
      <code>$1</code>
    </pre>`
  );

}

function parseInlineCode(
  content
) {

  return content.replace(
    /`(.*?)`/g,
    "<code>$1</code>"
  );

}

function parseLists(content) {

  return content.replace(
    /^\- (.*$)/gim,
    "<li>$1</li>"
  );

}

function parseLinks(content) {

  return content.replace(
    /\[(.*?)\]\((.*?)\)/g,
    `<a href="$2" target="_blank">$1</a>`
  );

}

function parseParagraphs(
  content
) {

  return content.replace(
    /\n$/gim,
    "<br />"
  );

} 
