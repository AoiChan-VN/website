import { 
    create 
} 
from './dom.js';

import { text } from './sanitizer.js';

import { renderMedia } from './media-engine.js';

export function renderViewer(data){

    const root =
        document.getElementById(
            'viewer'
        );

    const title =
        create('h1');

    text(title,data.name);

    root.append(title);

    for(const file of data.files){

        const block =
            create(
                'section',
                'media-block'
            );

        block.append(
            renderMedia(file)
        );

        root.append(block);
    }
} 
