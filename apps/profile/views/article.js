import { Fetcher } from "../../../system/utils/fetcher.js";
import { Markdown } from "../../../system/utils/markdown.js";

export async function renderArticle(
  file
){

  const markdown =
    await Fetcher.text(file);

  const root =
    document.createElement("article");

  root.className =
    "article-view";

  root.innerHTML =
    Markdown.parse(markdown);

  return root;

} 
