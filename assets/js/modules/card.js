import {
    create
}
from '../dom.js';

import {
    text
}
from '../sanitizer.js';

import {
    observe
}
from '../lazy.js';

import {
    openItem
}
from '../router.js';

export function createCard(data){

    const card =
        create('article','card');

    card.onclick = ()=>{

        openItem(data.id);
    };

    const cover =
        create('img','card-cover');

    cover.loading = 'lazy';

    cover.decoding = 'async';

    cover.src = data.cover;

    cover.alt =
        data.name || '';

    cover.onerror = ()=>{

        cover.src =
            './assets/fallback.webp';
    };

    const body =
        create('div','card-body');

    const title =
        create('h2','card-title');

    text(title,data.name);

    const desc =
        create('p','card-desc');

    text(
        desc,
        data.description
    );

    body.append(
        title,
        desc
    );

    if(data.tags?.length){

        const tags =
            create('div','tags');

        for(const tag of data.tags){

            const node =
                create('span','tag');

            text(node,tag);

            tags.append(node);
        }

        body.append(tags);
    }

    card.append(
        cover,
        body
    );

    observe(card);

    return card;
} 
