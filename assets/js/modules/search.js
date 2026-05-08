import { sanitize }
from './sanitize.js';

export function searchPosts(posts, query) {

    const normalizedQuery =
        sanitize(query);

    if (!normalizedQuery) {
        return posts;
    }

    return posts.filter(post => {

        const title =
            sanitize(post.title);

        const content =
            sanitize(post.content);

        const tags =
            Array.isArray(post.tags)
                ? post.tags.join(' ')
                : '';

        const normalizedTags =
            sanitize(tags);

        return (
            title.includes(normalizedQuery)
            ||
            content.includes(normalizedQuery)
            ||
            normalizedTags.includes(normalizedQuery)
        );

    });

} 
