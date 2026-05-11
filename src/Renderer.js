export class Renderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    async init(dataPath) {
        try {
            const response = await fetch(dataPath);
            const data = await response.json();
            this.render(data);
        } catch (error) {
            console.error("Renderer Error:", error);
        }
    }

    render(items) {
        this.container.innerHTML = items.map(item => `
            <div class="glass-card" data-id="${item.id}" data-path="${item.detailPath}">
                <div class="card-img" style="background-image: url('${item.image}')"></div>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `).join('');
    }
}
 
