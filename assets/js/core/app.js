import { loadPosts } from '../modules/loader.js';
import { renderPosts } from '../modules/renderer.js';

export async function initApp() {

    const app = document.querySelector('#app');

    const posts = await loadPosts();

    renderPosts(app, posts);

} 
