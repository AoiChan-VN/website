import {
    loadProfile,
    loadItem
}
from './loader.js';

import {
    renderCard
}
from './renderer.js';

import {
    clear
}
from './dom.js';

import {
    initLightbox
}
from './modules/lightbox.js';

const grid =
    document.getElementById('grid');

const search =
    document.getElementById(
        'searchInput'
    );

let items = [];

boot();

async function boot(){

    initLightbox();

    const profile =
        await loadProfile();

    const jobs =
        profile.items.map(loadItem);

    items =
        (await Promise.all(jobs))
        .filter(Boolean);

    render(items);
}

function render(list){

    clear(grid);

    if(!list.length){

        renderEmpty();

        return;
    }

    const frag =
        document.createDocumentFragment();

    for(const item of list){

        frag.append(
            renderCard(item)
        );
    }

    grid.append(frag);
}

function renderEmpty(){

    const empty =
        document.createElement('div');

    empty.className =
        'empty-state';

    empty.textContent =
        'No content found';

    grid.append(empty);
}

search.addEventListener(
    'input',
    e=>{

        const q =
            e.target.value
            .trim()
            .toLowerCase();

        if(!q){

            render(items);

            return;
        }

        const filtered =
            items.filter(item=>{

                const text = [

                    item.name,

                    item.description,

                    ...(item.tags || [])

                ]
                .join(' ')
                .toLowerCase();

                return text.includes(q);
            });

        render(filtered);
    }
);
