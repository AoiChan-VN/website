import { el } from './dom.js';

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

        case 'markdown':

            return markdown(file);

        case 'link':

            return link(file);

        case 'file':
        case 'zip':
        case 'download':

            return download(file);

        default:

            return unsupported(file);
    }
}

function image(file){

    const img = el('img');

    img.loading = 'lazy';

    img.decoding = 'async';

    img.src = file.src;

    return img;
}

function video(file){

    const v = el('video');

    v.controls = true;

    v.preload = 'none';

    v.src = file.src;

    return v;
}

function audio(file){

    const a = el('audio');

    a.controls = true;

    a.preload = 'none';

    a.src = file.src;

    return a;
}

function pdf(file){

    const iframe = el('iframe');

    iframe.src = file.src;

    iframe.loading = 'lazy';

    return iframe;
}

function iframe(file){

    const iframe = el('iframe');

    iframe.src = file.src;

    iframe.loading = 'lazy';

    iframe.referrerPolicy = 'no-referrer';

    return iframe;
}

function markdown(file){

    const pre = el('pre');

    pre.textContent = file.content || '';

    return pre;
}

function link(file){

    const a = el('a');

    a.href = file.src;

    a.target = '_blank';

    a.rel = 'noopener noreferrer';

    a.textContent = file.src;

    return a;
}

function download(file){

    const a = el('a');

    a.href = file.src;

    a.download = '';

    a.textContent = 'Download';

    return a;
}

function unsupported(file){

    const div = el('div');

    div.textContent =
        `Unsupported type: ${file.type}`;

    return div;
      } 
