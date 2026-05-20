export function PluginCard(plugin) {

    return `
        <article class="plugin-card">

            <img src="${plugin.img}" alt="${plugin.name}">

            <div class="plugin-content">

                <h3>${plugin.name}</h3>

                <p>${plugin.description}</p>

                <a href="${plugin.link}">
                    Open Plugin
                </a>

            </div>

        </article>
    `
}
