// main.js

import {
    AOIRuntime
} from './js/core/app.runtime.js';

async function bootstrap() {

    try {

        await AOIRuntime.initialize();

        console.info(
            '[AOI] Runtime Initialized'
        );

    } catch (error) {

        console.error(
            '[AOI] Bootstrap Error',
            error
        );
    }
}

if (
    document.readyState === 'loading'
) {

    document.addEventListener(
        'DOMContentLoaded',
        bootstrap
    );

} else {

    bootstrap();
} 
