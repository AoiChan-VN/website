import { loadPosts } from '../modules/loader.js';
import { createHeader } from '../components/header.js';

export async function renderPostPage(root, slug) {

    root.append(
        createHeader()
    );

    const posts =
        await loadPosts();

    const post =
        posts.find(item =>
            item.id === slug
        );

    if (!post) {

        root.innerHTML = `
            <section class="container">

                <h1>Post Not Found</h1>

            </section>
        `;

        return;

    }

    const page =
        document.createElement('section');

    page.className =
        'post-page';

    page.innerHTML = `
        <div class="container">

            <img
                class="post-cover"
                src="${post.thumbnail}"
                alt="${post.title}"
            >

            <div class="post-content">

                <h1>${post.title}</h1>

                <p>${post.content}</p>

            </div>

        </div>
    `;

    root.append(page);

}
