import { sanitize } from './sanitize.js';

export function searchPosts(
    index,
    query
) {

    const normalizedQuery =
        sanitize(query);

    if (!normalizedQuery) {

        return index.map(
            item => item.post
        );

    }

    return index
        .filter(item =>
            item.searchable.includes(
                normalizedQuery
            )
        )
        .map(item => item.post);

}
