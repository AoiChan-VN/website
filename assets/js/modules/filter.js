export function filterPostsByTag(posts, tag) {

    if (!tag) {
        return posts;
    }

    return posts.filter(post =>
        post.tags.includes(tag)
    );

} 
