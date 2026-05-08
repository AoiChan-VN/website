export function createNavigation() {

    const nav =
        document.createElement('nav');

    nav.className =
        'site-navigation';

    nav.innerHTML = `
        <a href="#/">Home</a>

        <a href="#/posts">Posts</a>

        <a href="#/projects">Projects</a>
    `;

    return nav;

} 
