import {
    create
}
from '../dom.js';

let root = null;

export function initLightbox(){

    root =
        create('div','lightbox');

    root.onclick = closeLightbox;

    document.body.append(root);
}

export function openLightbox(src){

    if(!root) return;

    root.innerHTML = '';

    const img =
        create('img');

    img.src = src;

    img.className =
        'lightbox-image';

    root.append(img);

    root.classList.add('open');
}

export function closeLightbox(){

    root.classList.remove('open');
} 
