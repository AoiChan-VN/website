import { renderHomePage } from '../pages/home.js';
import { renderPostPage } from '../pages/post.js';
import { renderNotFoundPage } from '../pages/notfound.js';
import { runCleanup } from './js/modules/lifecycle.js';

export async function router() {

    runCleanup();

    const app =
        document.querySelector('#app');

    app.innerHTML = '';

    const hash =
        location.hash.slice(1) || '/';

    app.innerHTML = '';

    const segments =
        hash.split('/').filter(Boolean);

    const route =
        segments[0];

    const slug =
        segments[1];

    switch (route) {

        case undefined:
            renderHomePage(app);
            break;

        case 'post':
            renderPostPage(app, slug);
            break;

        default:
            renderNotFoundPage(app);
            break;

    }

} 
