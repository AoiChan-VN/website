import { loadPosts } from '../modules/loader.js';
import { createPostCard } from '../components/cards.js';

export async function renderHomePage(root) {

    const posts =
        await loadPosts();

    const container =
        document.createElement('div');

    container.className =
        'container';

    const grid =
        document.createElement('div');

    grid.className =
        'grid';

    posts.forEach(post => {

        const card =
            createPostCard(post);

        grid.append(card);

    });

    container.append(grid);

    root.append(container);

} 
