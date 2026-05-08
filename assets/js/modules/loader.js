export async function loadPosts() {

    const manifestRequest =
        await fetch('./data/manifest.json');

    const manifest =
        await manifestRequest.json();

    const requests =
        manifest.posts.map(async file => {

            const response =
                await fetch(`./data/posts/${file}`);

            return response.json();

        });

    return Promise.all(requests);

}
