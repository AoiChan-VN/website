import { loadPosts }
from '../modules/loader.js';

import { extractTags }
from '../modules/tags.js';

import { filterPostsByTag }
from '../modules/filter.js';

import { createHeader }
from '../components/header.js';

import { createHero }
from '../components/hero.js';

import { createPostCard }
from '../components/cards.js';

import { createTags }
from '../components/tags.js';

export async function renderHomePage(root) {

    const posts =
        await loadPosts();

    const tags =
        extractTags(posts);

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

    const tagsComponent =
        createTags(tags, renderGrid);

    const grid =
        document.createElement('div');

    grid.className =
        'grid';

    function renderGrid(tag = null) {

        grid.innerHTML = '';

        const filtered =
            filterPostsByTag(
                posts,
                tag
            );

        filtered.forEach(post => {

            grid.append(
                createPostCard(post)
            );

        });

    }

    renderGrid();

    container.append(
        tagsComponent,
        grid
    );

    section.append(container);

    root.append(section);

}
