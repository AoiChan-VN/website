export const profileData = Object.freeze({
    fullName: 'Aoi Chan',
    role: 'Frontend Architect & Creative Developer',
    tagline:
        'Building ultra-smooth interfaces with native web technologies and performance-first architecture.',
    avatar:
        './assets/images/project-ai.webp',
    email: 'contact@aoichan.dev',
    location: 'Pleiku, Gia Lai, Vietnam',
    socials: Object.freeze({
        github: 'https://github.com/',
        facebook: 'https://facebook.com/',
        youtube: 'https://youtube.com/'
    })
});

export const skillsData = Object.freeze([
    'HTML5',
    'CSS3',
    'JavaScript ES2026',
    'Performance Optimization',
    'UI Animation',
    'Web Accessibility',
    'Responsive Design',
    'IntersectionObserver',
    'Native Web Components',
    'Stream Processing'
]);

export const projectsData = Object.freeze([
    {
        id: crypto.randomUUID(),
        title: 'Realtime Analytics Dashboard',
        desc: 'Realtime streaming analytics dashboard with optimized rendering pipeline and zero-lag interaction system.',
        techStack: [
            'HTML5',
            'CSS Grid',
            'Native JavaScript',
            'SSE'
        ],
        link: 'https://example.com/dashboard',
        image: './assets/images/project-dashboard.webp'
    },

    {
        id: crypto.randomUUID(),
        title: 'AI Music Visualizer',
        desc: 'GPU-accelerated music visualization engine using requestAnimationFrame and adaptive rendering.',
        techStack: [
            'Canvas API',
            'Web Audio API',
            'JavaScript'
        ],
        link: 'https://example.com/visualizer',
        image: './assets/images/project-ai.webp'
    },

    {
        id: crypto.randomUUID(),
        title: 'Immersive Portfolio Experience',
        desc: 'Interactive cinematic portfolio platform focused on buttery smooth transitions and modular architecture.',
        techStack: [
            'IntersectionObserver',
            'Flexbox',
            'CSS Animation'
        ],
        link: 'https://example.com/portfolio',
        image: './assets/images/project-music.webp'
    }
]);
