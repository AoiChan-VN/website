export const cacheConfig = Object.freeze({
    staticCacheName:
        'portfolio-static-v1',

    dynamicCacheName:
        'portfolio-dynamic-v1',

    offlinePage: '/offline.html',

    precacheAssets: Object.freeze([
        '/',
        '/index.html',
        '/offline.html',
        '/css/reset.css',
        '/css/base.css',
        '/css/components.css',
        '/src/main.js'
    ])
}); 
