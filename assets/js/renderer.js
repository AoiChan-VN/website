import { sanitize } from './sanitizer.js';

import { el } from './dom.js';

import { renderMedia } from './media-engine.js';

import { observe } from './lazy.js';

export function renderCard(data){

    const card = el('article','card');

    card.onclick = ()=>{

        location.href =
            `viewer.html?id=${data.id}`;
    };

    const cover = el('img','card-cover');

    cover.loading = 'lazy';

    cover.src = data.cover;

    const body = el('div','card-body');

    const title = el('h2','card-title');

    title.innerHTML = sanitize(data.name);

    const desc = el('p','card-desc');

    desc.innerHTML = sanitize(
        data.description
    );

    const tags = el('div','tags');

    for(const tag of data.tags || []){

        const node = el('span','tag');

        node.innerHTML = sanitize(tag);

        tags.append(node);
    }

    body.append(
        title,
        desc,
        tags
    );

    card.append(
        cover,
        body
    );

    observe(card);

    return card;
}

export function renderViewer(data){

    const root =
        document.getElementById('viewer');

    const hero = el('section','viewer-hero');

    const title = el('h1');

    title.textContent = data.name;

    const desc = el('p');

    desc.textContent = data.description;

    hero.append(
        title,
        desc
    );

    root.append(hero);

    for(const file of data.files){

        const wrap = el('section','media-block');

        const media = renderMedia(file);

        wrap.append(media);

        root.append(wrap);
    }
} 
