import { loadDatabase } from "../services/database.js";
import { createPluginCard } from "../components/plugin-card.js";

export async function loadPluginsPage() {
    const data = await loadDatabase(
        "./database/plugins/aoi-plugins.json"
    );

    const container = document.querySelector("#plugins");

    container.innerHTML = "";

    data.forEach(plugin => {
        container.appendChild(
            createPluginCard(plugin)
        );
    });
}