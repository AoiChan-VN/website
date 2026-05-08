import { loadPosts } from '../modules/loader.js';

import { createHeader }
from '../components/header.js';

import { createHero }
from '../components/hero.js';

import { createPostCard }
from '../components/cards.js';

export async function renderHomePage(root) {

    const posts =
        await loadPosts();

    root.append(
        createHeader()
    );

    root.append(
        createHero()
    );

    const section =
        document.createElement('section');

    section.className =
        'posts-section';

    const container =
        document.createElement('div');

    container.className =
        'container';

    const grid =
        document.createElement('div');

    grid.className =
        'grid';

    posts.forEach(post => {

        grid.append(
            createPostCard(post)
        );

    });

    container.append(grid);

    section.append(container);

    root.append(section);

}
