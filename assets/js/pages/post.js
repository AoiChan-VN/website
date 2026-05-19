import { loadDatabase } from "../services/database.js";
import { fetchText } from "../utils/fetch.js";
import { parseMarkdown } from "../services/markdown.js";

export async function loadPostPage() {
    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    const data = await loadDatabase(
        "./database/plugins/aoi-plugins.json"
    );

    const plugin = data.find(item => item.id === id);

    if (!plugin) {
        return;
    }

    const markdown = await fetchText(plugin.file);

    const html = parseMarkdown(markdown);

    document.querySelector("#markdown-content").innerHTML = html;
}