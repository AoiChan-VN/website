import {
    lazyLoadImage
}
from '../modules/image.js';

export function createPostCard(post) {

    const article =
        document.createElement('article');

    article.className =
        'card';

    article.innerHTML = `
        <a href="#/post/${post.id}">

            <img
                class="lazy-image"
                data-src="${post.thumbnail}"
                alt="${post.title}"
            >

            <div class="card-content">

                <h2>${post.title}</h2>

                <p>${post.description}</p>

            </div>

        </a>
    `;

    const image =
        article.querySelector('img');

    lazyLoadImage(image);

    return article;

}
