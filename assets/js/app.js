import { loadProfile, loadItem } from './loader.js';

import { renderCard } from './renderer.js';

import { searchItems } from './search-engine.js';

import { setState, getState } from './state.js';

const grid =
    document.getElementById('grid');

const search =
    document.getElementById(
        'searchInput'
    );

boot();

async function boot(){

    const profile =
        await loadProfile();

    setState(
        'profile',
        profile
    );

    const jobs =
        profile.items.map(loadItem);

    const items =
        (await Promise.all(jobs))
        .filter(Boolean);

    setState(
        'items',
        items
    );

    render(items);
}

function render(items){

    grid.innerHTML = '';

    const frag =
        document.createDocumentFragment();

    for(const item of items){

        frag.append(
            renderCard(item)
        );
    }

    grid.append(frag);
}

search.addEventListener(
    'input',
    e=>{

        const items =
            getState().items;

        const result =
            searchItems(
                items,
                e.target.value
            );

        render(result);
    }
);
