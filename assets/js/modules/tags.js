export function extractTags(posts) {

    const tags =
        new Set();

    posts.forEach(post => {

        post.tags.forEach(tag => {

            tags.add(tag);

        });

    });

    return [...tags];

} 
