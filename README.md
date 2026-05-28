# ROOT STRUCTURE

```txt
/native-space-portal/
│
├── index.html
├── manifest.webmanifest
├── favicon.ico
│
├── /assets/
│   ├── /icons/
│   ├── /textures/
│   ├── /images/
│   ├── /docs/
│   └── /fonts/
│
├── /styles/
│   ├── reset.css
│   ├── variables.css
│   ├── global.css
│   ├── layout.css
│   ├── animations.css
│   ├── parallax.css
│   ├── viewer.css
│   ├── responsive.css
│   └── themes.css
│
├── /scripts/
│   ├── core.js
│   ├── app.js
│   ├── router.js
│   ├── state.js
│   ├── lifecycle.js
│   │
│   ├── /engines/
│   │   ├── parallax-engine.js
│   │   ├── gyroscope-engine.js
│   │   ├── animation-engine.js
│   │   ├── render-engine.js
│   │   └── memory-manager.js
│   │
│   ├── /ui/
│   │   ├── sidebar.js
│   │   ├── topbar.js
│   │   ├── modal.js
│   │   ├── notification.js
│   │   ├── dock.js
│   │   ├── loading-screen.js
│   │   └── document-panel.js
│   │
│   ├── /viewers/
│   │   ├── txt-viewer.js
│   │   ├── md-viewer.js
│   │   ├── pdf-viewer.js
│   │   └── file-loader.js
│   │
│   ├── /utils/
│   │   ├── dom.js
│   │   ├── math.js
│   │   ├── device.js
│   │   ├── cleanup.js
│   │   ├── raf.js
│   │   └── validator.js
│   │
│   └── /configs/
│       ├── parallax.config.js
│       ├── theme.config.js
│       └── app.config.js
│
└── /data/
    ├── panels.json
    ├── navigation.json
    └── themes.json
```

# EXECUTION ORDER

```txt
1. index.html
2. variables.css
3. reset.css
4. global.css
5. layout.css
6. animations.css
7. parallax.css
8. responsive.css
9. core.js
10. state.js
11. lifecycle.js
12. render-engine.js
13. parallax-engine.js
14. gyroscope-engine.js
15. app.js
```

# CORE UI LAYERS

```txt
Layer 01 :: Cosmic Background
Layer 02 :: Nebula Gradient Field
Layer 03 :: Starfield Motion
Layer 04 :: Parallax Objects
Layer 05 :: Glass UI Containers
Layer 06 :: Document Viewer System
Layer 07 :: Overlay / Modal System
Layer 08 :: Notification Layer
```

# NAMING CONVENTION

```txt
ID:
portal-root
portal-background
portal-parallax-stage
portal-ui-layer
portal-document-viewer
portal-sidebar
portal-topbar
portal-modal-root

CLASS:
.cosmic-panel
.glass-layer
.parallax-node
.neon-border
.viewer-frame
.floating-orb
.depth-layer
.blur-surface

DATA:
data-depth
data-axis
data-panel
data-viewer
data-state
```

# GLOBAL RULESET LOCK

```txt
• ES Modules Only
• No External Dependencies
• No Frameworks
• No CDN
• No Placeholder Logic
• No Incomplete Functions
• requestAnimationFrame Required
• removeEventListener Mandatory
• Responsive First
• GPU Optimized Motion
• Glassmorphism + Deep Space Theme
• Plug And Play Final Files Only
```

# FIRST BUILD TARGET

```txt
PHASE 01:

• index.html
• reset.css
• variables.css
• global.css
• core.js

GOAL:
Render native cosmic environment with:
- animated deep-space background
- glassmorphism root UI
- parallax-ready stage
- responsive viewport system
- zero external assets
```

# REDUNDANT FILE POLICY

```txt
Current Redundant Files:
NONE
```
 
