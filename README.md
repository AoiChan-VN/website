# Aoi Vanilla Web

## Chạy localhost

Python:

```bash
python -m http.server 8080
```

Sau đó mở:

http://localhost:8080

# Structure:

portfolio/
├── index.html
├── data/
│   └── portfolioData.js
├── assets/
│   ├── images/
│   │   ├── project-dashboard.webp
│   │   ├── project-ai.webp
│   │   └── project-music.webp
│   └── icons/
├── src/
│   ├── core/
│   │   ├── RenderEngine.js
│   │   └── DOMCache.js
│   ├── components/
│   │   ├── ProjectCard.js
│   │   ├── ProfileSection.js
│   │   ├── SkillsSection.js
│   │   └── ProjectsSection.js
│   ├── utils/
│   │   ├── animation.js
│   │   ├── dom.js
│   │   └── sanitizer.js
│   └── main.js
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── animations.css
└── README.md
