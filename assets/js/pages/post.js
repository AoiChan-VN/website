import { loadPosts } from '../modules/loader.js';

export async function renderPostPage(root, slug) {

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

    root.innerHTML = `
        <section class="post-page">

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

        </section>
    `;

} 
