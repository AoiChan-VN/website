export const siteData = {
    settings: {
        logo: "./assets/Logo.webp",
        youtubeChannel: "https://youtube.com",
        serverIP: "://yourserver.com"
    },
    // Chuyên mục Plugins
    plugins: [
        { 
            id: "anti-grief", 
            name: "Anti-Grief System", 
            version: "1.20.1", 
            desc: "Hệ thống bảo vệ vùng đất nâng cao.",
            mdPath: "content/plugin.md", // Đường dẫn file .md
            img: "https://placehold.co"
        }
    ],
    // Chuyên mục Resource Packs
    resources: [
        { 
            id: "survival-pack", 
            name: "Survival Texture", 
            size: "25MB", 
            desc: "Texture pack sinh tồn cực nhẹ.",
            mdPath: "content/resource1.md",
            img: "https://placehold.co"
        }
    ],
    // Chuyên mục Youtube
    youtube: [
        { id: "v1", title: "Trailer Server", videoId: "dQw4w9WgXcQ", date: "2024" }
    ]
};
