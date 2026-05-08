export function renderPosts(root, posts) {

    const container =
        document.createElement('div');

    container.className =
        'container';

    const grid =
        document.createElement('div');

    grid.className =
        'grid';

    posts.forEach(post => {

        const card =
            document.createElement('article');

        card.className =
            'card';

        card.innerHTML = `
            <img src="${post.thumbnail}" alt="${post.title}">

            <div class="card-content">

                <h2>${post.title}</h2>

                <p>${post.description}</p>

            </div>
        `;

        grid.append(card);

    });

    container.append(grid);

    root.append(container);

} 
