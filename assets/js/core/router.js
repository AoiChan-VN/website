import { renderHomePage } from '../pages/home.js';
import { renderPostPage } from '../pages/post.js';
import { renderNotFoundPage } from '../pages/notfound.js';
import { runCleanup } from '../modules/lifecycle.js';
import { restoreFocus } from '../modules/focus.js';

export async function router() {

    runCleanup();

    const app =
        document.querySelector('#app');

    app.innerHTML = '';

    const hash =
        location.hash.slice(1) || '/';

    const segments =
        hash.split('/').filter(Boolean);

    const route =
        segments[0];

    const slug =
        segments[1];

    switch (route) {

        case undefined:
            await renderHomePage(app);
            break;

        case 'post':
            await renderPostPage(
                app,
                slug
            );
            break;

        default:
            renderNotFoundPage(app);
            break;

    }

    restoreFocus();

}
