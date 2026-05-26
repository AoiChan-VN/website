import { fetchText }
from "./fetch.js";

import { renderMarkdown }
from "../modules/markdown.js";

export async function getMarkdown(
  path
) {

  const raw =
    await fetchText(path);

  return renderMarkdown(raw);

}
