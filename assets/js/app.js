import {
    create
}
from './dom.js';

export function renderMedia(file){

    switch(file.type){

        case 'image':
        case 'gif':
        case 'webp':

            return image(file);

        case 'video':

            return video(file);

        case 'audio':

            return audio(file);

        case 'pdf':

            return pdf(file);

        case 'iframe':

            return iframe(file);

        case 'link':

            return link(file);

        default:

            return unknown(file);
    }
}

function image(file){

    const img =
        create('img');

    img.loading = 'lazy';

    img.decoding = 'async';

    img.src = file.src;

    img.alt = '';

    img.referrerPolicy =
        'no-referrer';

    return img;
}

function video(file){

    const video =
        create('video');

    video.controls = true;

    video.preload = 'metadata';

    video.playsInline = true;

    video.src = file.src;

    return video;
}

function audio(file){

    const audio =
        create('audio');

    audio.controls = true;

    audio.preload = 'none';

    audio.src = file.src;

    return audio;
}

function pdf(file){

    const iframe =
        create('iframe');

    iframe.loading = 'lazy';

    iframe.src = file.src;

    iframe.sandbox =
        'allow-same-origin';

    return iframe;
}

function iframe(file){

    const iframe =
        create('iframe');

    iframe.loading = 'lazy';

    iframe.src = file.src;

    iframe.referrerPolicy =
        'no-referrer';

    iframe.sandbox =
        'allow-scripts allow-same-origin';

    return iframe;
}

function link(file){

    const a =
        create('a');

    a.href = file.src;

    a.target = '_blank';

    a.rel =
        'noopener noreferrer';

    a.textContent =
        file.src;

    return a;
}

function unknown(file){

    const div =
        create('div');

    div.textContent =
        `Unsupported: ${file.type}`;

    return div;
}
