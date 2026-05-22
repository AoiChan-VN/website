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
Website/
├── index.html
├── README.md
│
├── pages/
│   ├── products.html
│   ├── docs.html
│   ├── about.html
│   └── contact.html
│
├── assets/
│   ├── audio/
│   │   ├── click.mp3
│   │   ├── hover.mp3
│   │   └── open.mp3
│   │
│   ├── fonts/
│   │   └── SF-Pro-Display.woff2
│   │
│   ├── icons/
│   │   ├── favicon.svg
│   │   ├── menu.svg
│   │   ├── close.svg
│   │   └── arrow.svg
│   │
│   └── images/
│       ├── backgrounds/
│       │   ├── bg-main.webp
│       │   └── bg-grid.webp
│       │
│       ├── branding/
│       │   ├── logo.webp
│       │   ├── logo-mark.webp
│       │   └── anime-frame.webp
│       │
│       ├── cards/
│       │   ├── card-01.webp
│       │   ├── card-02.webp
│       │   └── placeholder.webp
│       │
│       └── ui/
│           ├── glow.webp
│           └── noise.webp
│
├── data/
│   ├── navigation.data.js
│   ├── products.data.js
│   ├── socials.data.js
│   ├── site.config.js
│   └── themes.data.js
│
├── styles/
│   ├── core/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── typography.css
│   │   └── animations.css
│   │
│   ├── layout/
│   │   ├── layout.css
│   │   ├── header.css
│   │   ├── footer.css
│   │   └── sections.css
│   │
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── panels.css
│   │   ├── modal.css
│   │   ├── cursor.css
│   │   ├── audio.css
│   │   └── navbar.css
│   │
│   └── pages/
│       ├── home.css
│       ├── products.css
│       ├── docs.css
│       └── about.css
│
├── scripts/
│   ├── core/
│   │   ├── bootstrap.js
│   │   ├── registry.js
│   │   └── app.js
│   │
│   ├── components/
│   │   ├── navbar.component.js
│   │   ├── hero.component.js
│   │   ├── card.component.js
│   │   ├── panel.component.js
│   │   ├── modal.component.js
│   │   └── footer.component.js
│   │
│   ├── services/
│   │   ├── audio.service.js
│   │   ├── preload.service.js
│   │   ├── interaction.service.js
│   │   ├── responsive.service.js
│   │   ├── animation.service.js
│   │   └── lazyload.service.js
│   │
│   ├── state/
│   │   ├── storage.state.js
│   │   ├── theme.state.js
│   │   └── ui.state.js
│   │
│   └── utils/
│       ├── dom.util.js
│       ├── device.util.js
│       ├── image.util.js
│       ├── motion.util.js
│       └── observer.util.js
│
└── .nojekyll
```
