import { sanitize } from './sanitize.js';

export function buildSearchIndex(
    posts
) {

    return posts.map(post => {

        const index = [

            post.title,
            post.description,
            post.content,
            ...(post.tags || [])

        ]
            .join(' ')
            .toLowerCase();

        return {

            post,

            searchable:
                sanitize(index)

        };

    });

} 
