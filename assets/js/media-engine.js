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
    openLightbox
}
from './modules/lightbox.js';

import {
    clear
}
from './dom.js';

const grid =
    document.getElementById('grid');

const search =
    document.getElementById(
        'searchInput'
    );

let items = [];

boot();

async function boot(){

    const profile =
        await loadProfile();

    const jobs =
        profile.items.map(loadItem);

    items =
        (await Promise.all(jobs))
        .filter(Boolean);

    render(items);
}

function image(file){

    const img =
        create('img');

    img.loading = 'lazy';

    img.decoding = 'async';

    img.src = file.src;

    img.alt = '';

    img.onclick = ()=>{

        openLightbox(file.src);
    };

    return img;
}

function render(list){

    clear(grid);

    const frag =
        document.createDocumentFragment();

    for(const item of list){

        frag.append(
            renderCard(item)
        );
    }

    grid.append(frag);
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
