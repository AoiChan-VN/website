const prefetched =
    new Set();

export async function prefetchPost(post) {

    if (!post?.__file) {
        return;
    }

    if (
        prefetched.has(post.__file)
    ) {
        return;
    }

    try {

        await fetch(
            `./data/posts/${post.__file}`
        );

        prefetched.add(
            post.__file
        );

    } catch {}

}
