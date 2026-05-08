import { loadPosts }
from '../modules/loader.js';

import { extractTags }
from '../modules/tags.js';

import { filterPostsByTag }
from '../modules/filter.js';

import { searchPosts }
from '../modules/search.js';

import { createHeader }
from '../components/header.js';

import { createHero }
from '../components/hero.js';

import { createPostCard }
from '../components/cards.js';

import { createTags }
from '../components/tags.js';

import { createSearch }
from '../components/search.js';

export async function renderHomePage(root) {

    const posts =
        await loadPosts();

    const tags =
        extractTags(posts);

    let currentTag =
        null;

    let currentQuery =
        '';

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

    const search =
        createSearch(query => {

            currentQuery =
                query;

            renderGrid();

        });

    const tagsComponent =
        createTags(tags, tag => {

            currentTag =
                tag;

            renderGrid();

        });

    const grid =
        document.createElement('div');

    grid.className =
        'grid';

    function renderGrid() {

        grid.innerHTML = '';

        let filtered =
            filterPostsByTag(
                posts,
                currentTag
            );

        filtered =
            searchPosts(
                filtered,
                currentQuery
            );

        if (!filtered.length) {

            grid.innerHTML = `
                <p>No results found.</p>
            `;

            return;

        }

        filtered.forEach(post => {

            grid.append(
                createPostCard(post)
            );

        });

    }

    renderGrid();

    container.append(
        search,
        tagsComponent,
        grid
    );

    section.append(container);

    root.append(section);

}
