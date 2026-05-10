import { loadProfile,loadItem } from './loader.js';

import { renderCard } from './renderer.js';

import { idle } from './util.js';

const grid =
    document.getElementById('grid');

const searchInput =
    document.getElementById('searchInput');

let allItems = [];

boot();

async function boot(){

    const profile =
        await loadProfile();

    await idle();

    const jobs =
        profile.items.map(loadItem);

    allItems =
        await Promise.all(jobs);

    render(allItems);
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

searchInput.addEventListener(
    'input',
    e=>{

        const q =
            e.target.value
                .trim()
                .toLowerCase();

        if(!q){

            render(allItems);

            return;
        }

        const filtered =
            allItems.filter(item=>{

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
