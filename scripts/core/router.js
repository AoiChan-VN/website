import { DataEngine } from './data-engine.js';

/**
 * Simple Client-side Router
 */
const routes = {
    '/': { title: 'Home', render: renderHome },
    '/plugins': { title: 'Plugins', render: renderPlugins },
};

async function renderHome() {
    return `<h1>Engineering Excellence.</h1><p>Welcome to my professional space.</p>`;
}

async function renderPlugins() {
    const data = await DataEngine.fetchData('plugins');
    if (!data) return `<p>Error loading plugins.</p>`;
    
    return `
        <h1>Plugins</h1>
        <div class="grid">
            ${data.map(item => `
                <div class="card">
                    <h3>${DataEngine.sanitizeHTML(item.name)}</h3>
                    <p>${DataEngine.sanitizeHTML(item.description)}</p>
                </div>
            `).join('')}
        </div>
    `;
}

const navigate = async (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    const route = routes[path] || routes['/'];
    document.getElementById('app-root').innerHTML = await route.render();
};

// Event Delegation cho navigation
document.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
        e.preventDefault();
        navigate(e.target.getAttribute('href'));
    }
});

// Handle back/forward
window.onpopstate = () => navigate(window.location.pathname);

// Initial load
navigate(window.location.pathname);
 
