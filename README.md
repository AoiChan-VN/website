# Aoi Vanilla Web

## Chạy localhost

Python:

```bash
python -m http.server 8080
```

Sau đó mở:

http://localhost:8080

# Structure:
```txt
portfolio/
├── index.html
├── data/
│   ├── portfolioData.js✅
│   ├── routes.js✅
│   ├── themes.js✅
│   └── settings.js✅
├── assets/
│   ├── images/
│   └── icons/
├── src/
│   ├── core/
│   │   ├── RenderEngine.js✅
│   │   ├── DOMCache.js✅
│   │   ├── Router.js
│   │   ├── StateManager.js
│   │   ├── EventSystem.js
│   │   ├── VirtualDOM.js
│   │   ├── Lifecycle.js
│   │   └── ErrorBoundary.js
│   ├── components/
│   │   ├── ProjectCard.js✅
│   │   ├── ProfileSection.js✅
│   │   ├── SkillsSection.js✅
│   │   ├── ProjectsSection.js✅
│   │   └── ThemeToggle.js
│   ├── utils/
│   │   ├── animation.js✅
│   │   ├── dom.js✅
│   │   ├── sanitizer.js
│   │   ├── lazyLoad.js
│   │   ├── performance.js
│   │   └── debounce.js
│   └── main.js
├── css/
│   ├── reset.css✅
│   ├── variables.css✅
│   ├── themes.css
│   ├── base.css✅
│   ├── layout.css✅
│   ├── components.css✅
│   ├── responsive.css
│   └── animations.css✅
└── README.md
```
