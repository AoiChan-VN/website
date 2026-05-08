import { loadPosts } from '../modules/loader.js';
import { extractTags } from '../modules/tags.js';
import { filterPostsByTag } from '../modules/filter.js';
import { searchPosts } from '../modules/search.js';
import { createFragment } from '../modules/batch.js';
import { createHeader } from '../components/header.js';
import { createHero } from '../components/hero.js';
import { createPostCard } from '../components/cards.js';
import { createTags } from '../components/tags.js';
import { createSearch } from '../components/search.js';

export async function renderHomePage(root) {

    root.innerHTML = '';

    const posts =
        await loadPosts();

    const tags =
        extractTags(posts);

    let currentTag =
        null;

    let currentQuery =
        '';

    const header =
        createHeader();

    const hero =
        createHero();

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

        let filteredPosts =
            filterPostsByTag(
                posts,
                currentTag
            );

        filteredPosts =
            searchPosts(
                filteredPosts,
                currentQuery
            );

        if (!filteredPosts.length) {

            const empty =
                document.createElement('div');

            empty.className =
                'empty-state';

            empty.innerHTML = `
                <p>
                    No results found.
                </p>
            `;

            grid.append(empty);

            return;

        }

        const cards =
            filteredPosts.map(post =>
                createPostCard(post)
            );

        const fragment =
            createFragment(cards);

        grid.append(fragment);

    }

    renderGrid();

    container.append(
        search,
        tagsComponent,
        grid
    );

    section.append(
        container
    );

    root.append(
        header,
        hero,
        section
    );

} 
