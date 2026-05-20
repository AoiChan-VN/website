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
├── manifest.webmanifest
├── service-worker.js
├── offline.html
├── data/
│   ├── portfolioData.js
│   ├── routes.js
│   ├── themes.js
│   ├── settings.js
│   ├── componentRegistry.js
│   └── cacheConfig.js
├── assets/
│   ├── fonts/
│   ├── images/
│   ├── videos/
│   ├── icons/
│   └── audio/
├── src/
│   ├── core/
│   │   ├── RenderEngine.js
│   │   ├── DOMCache.js
│   │   ├── Router.js
│   │   ├── StateManager.js
│   │   ├── EventSystem.js
│   │   ├── VirtualDOM.js
│   │   ├── Lifecycle.js
│   │   ├── ErrorBoundary.js
│   │   ├── ComponentRegistry.js
│   │   ├── AssetLoader.js
│   │   ├── IdleScheduler.js
│   │   ├── PersistentStore.js
│   │   ├── StreamingRenderer.js
│   │   ├── CommandBus.js
│   │   ├── VisibilityManager.js
│   │   ├── RenderQueue.js
│   │   └── BackgroundTaskQueue.js
│   ├── components/
│   │   ├── ProjectCard.js
│   │   ├── ProfileSection.js
│   │   ├── SkillsSection.js
│   │   ├── ProjectsSection.js
│   │   ├── ThemeToggle.js
│   │   ├── MetricsPanel.js
│   │   └── DiagnosticsPanel.js
│   ├── utils/
│   │   ├── animation.js
│   │   ├── dom.js
│   │   ├── sanitizer.js
│   │   ├── lazyLoad.js
│   │   ├── performance.js
│   │   ├── debounce.js
│   │   ├── accessibility.js
│   │   ├── prefetch.js
│   │   ├── memory.js
│   │   ├── network.js
│   │   └── gpu.js
│   └── main.js
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── themes.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── responsive.css
│   ├── animations.css
│   ├── accessibility.css
│   └── diagnostics.css
└── README.md
```
