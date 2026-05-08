const prefetched =
    new Set();

export async function prefetchPost(id) {

    if (prefetched.has(id)) {
        return;
    }

    try {

        await fetch(
            `./data/posts/${id}.json`
        );

        prefetched.add(id);

    } catch {}

} 
