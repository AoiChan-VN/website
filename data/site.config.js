const siteConfig = Object.freeze({
    siteName: "Website",

    siteDescription:
        "Minimal Anime iOS Portfolio Website",

    siteLanguage: "vi",

    repositoryName: "Website",

    theme: {
        defaultTheme: "dark",

        enableThemeToggle: true,

        persistTheme: true
    },

    audio: {
        enabled: true,

        volume: 0.42,

        hoverSound:
            "./assets/audio/hover.mp3",

        clickSound:
            "./assets/audio/click.mp3",

        openSound:
            "./assets/audio/open.mp3"
    },

    cursor: {
        enabled: true,

        magneticButtons: true,

        rippleEffect: true
    },

    animations: {
        enabled: true,

        cardTilt: true,

        parallax: true,

        reducedMotionSupport: true
    },

    images: {
        lazyLoading: true,

        asyncDecoding: true,

        preloadHeroAssets: true
    },

    performance: {
        enableIntersectionObserver: true,

        enableIdleTasks: true,

        imageDecodeAsync: true
    },

    branding: {
        logo:
            "./assets/images/branding/logo.webp",

        logoMark:
            "./assets/images/branding/logo-mark.webp",

        heroBackground:
            "./assets/images/backgrounds/bg-main.webp",

        animeFrame:
            "./assets/images/branding/anime-frame.webp"
    },

    social: {
        github: "",
        youtube: "",
        discord: "",
        facebook: ""
    }
});

export default siteConfig;
