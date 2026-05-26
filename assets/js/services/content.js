import { renderMarkdown }
from "../modules/markdown.js";

const cache =
  new Map();

async function fetchText(path) {

  if (cache.has(path)) {

    return cache.get(path);

  }

  const response =
    await fetch(path);

  if (!response.ok) {

    throw new Error(
      `[CONTENT] ${path}`
    );

  }

  const text =
    await response.text();

  cache.set(path, text);

  return text;

}

export async function getMarkdown(path) {

  const raw =
    await fetchText(path);

  return renderMarkdown(raw);

} 
