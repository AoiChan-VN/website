import { create }
from './dom.js';

export function renderMedia(file){

    switch(file.type){

        case 'image':
        case 'webp':
        case 'gif':

            return renderImage(file);

        case 'video':

            return renderVideo(file);

        case 'audio':

            return renderAudio(file);

        case 'pdf':

            return renderPDF(file);

        case 'link':

            return renderLink(file);

        case 'iframe':

            return renderIframe(file);

        default:

            return renderUnknown(file);
    }
}

function renderImage(file){

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

function renderVideo(file){

    const video =
        create('video');

    video.controls = true;

    video.preload = 'metadata';

    video.src = file.src;

    return video;
}

function renderAudio(file){

    const audio =
        create('audio');

    audio.controls = true;

    audio.preload = 'none';

    audio.src = file.src;

    return audio;
}

function renderPDF(file){

    const iframe =
        create('iframe');

    iframe.loading = 'lazy';

    iframe.src = file.src;

    iframe.sandbox =
        'allow-same-origin';

    return iframe;
}

function renderIframe(file){

    const iframe =
        create('iframe');

    iframe.loading = 'lazy';

    iframe.src = file.src;

    iframe.sandbox =
        'allow-scripts allow-same-origin';

    iframe.referrerPolicy =
        'no-referrer';

    return iframe;
}

function renderLink(file){

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

function renderUnknown(file){

    const div =
        create('div');

    div.textContent =
        `Unsupported: ${file.type}`;

    return div;
}
