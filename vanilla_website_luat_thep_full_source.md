# 🧱 VANILLA WEBSITE - LUẬT THÉP SOURCE

## MỤC TIÊU

- Không framework
- Không thư viện ngoài
- Không CDN
- Không npm
- Không build tool
- Không dependency
- Chạy được:
  - GitHub Pages
  - Localhost
  - Offline USB
  - Windows
  - Linux
  - Android Browser

---

# 📁 STRUCTURE CHUẨN

```txt
/root
│
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── favicon.ico
│
├── /pages
│   ├── about.html
│   ├── projects.html
│   ├── blog.html
│   └── contact.html
│
├── /assets
│   │
│   ├── /css
│   │   ├── reset.css
│   │   ├── variables.css
│   │   ├── global.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── responsive.css
│   │
│   ├── /js
│   │   ├── core
│   │   │   ├── app.js
│   │   │   ├── router.js
│   │   │   ├── storage.js
│   │   │   └── config.js
│   │   │
│   │   ├── modules
│   │   │   ├── navbar.js
│   │   │   ├── theme.js
│   │   │   ├── animations.js
│   │   │   └── projects.js
│   │   │
│   │   ├── utils
│   │   │   ├── dom.js
│   │   │   ├── validator.js
│   │   │   ├── helpers.js
│   │   │   └── security.js
│   │   │
│   │   └── main.js
│   │
│   ├── /img
│   ├── /fonts
│   │
│   └── /data
│       ├── projects.json
│       └── blog.json
│
└── /docs
    ├── LICENSE.txt
    ├── CHANGELOG.md
    └── README.md
```

---

# 📄 index.html

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>My Vanilla Website</title>

  <meta name="description" content="Pure Vanilla Website">

  <link rel="stylesheet" href="./assets/css/reset.css">
  <link rel="stylesheet" href="./assets/css/variables.css">
  <link rel="stylesheet" href="./assets/css/global.css">
  <link rel="stylesheet" href="./assets/css/layout.css">
  <link rel="stylesheet" href="./assets/css/components.css">
  <link rel="stylesheet" href="./assets/css/responsive.css">

  <script type="module" src="./assets/js/main.js" defer></script>
</head>
<body>

<header class="header">
  <nav class="navbar container">
    <a href="/">Home</a>
    <a href="./pages/about.html">About</a>
    <a href="./pages/projects.html">Projects</a>
    <a href="./pages/blog.html">Blog</a>
    <a href="./pages/contact.html">Contact</a>
  </nav>
</header>

<main>

  <section class="hero container">
    <h1>Vanilla Website</h1>
    <p>Pure HTML CSS JavaScript</p>
  </section>

</main>

<footer class="footer container">
  <p>2026 © Aoi</p>
</footer>

</body>
</html>
```

---

# 📄 main.js

```js
import { initTheme } from "./modules/theme.js";
import { initNavbar } from "./modules/navbar.js";

function bootstrap() {
  initTheme();
  initNavbar();
}

document.addEventListener("DOMContentLoaded", bootstrap);
```

---

# 📄 theme.js

```js
export function initTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
}
```

---

# 📄 navbar.js

```js
export function initNavbar() {
  const links = document.querySelectorAll(".navbar a");

  links.forEach(link => {
    link.addEventListener("click", () => {
      console.log("Navigate:", link.href);
    });
  });
}
```

---

# 📄 variables.css

```css
:root {
  --bg-color: #0f0f0f;
  --text-color: #ffffff;

  --primary-color: #6ea8fe;

  --container-width: 1200px;

  --radius: 12px;

  --transition: 0.3s;
}
```

---

# 📄 reset.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

---

# 📄 global.css

```css
body {
  background: var(--bg-color);
  color: var(--text-color);

  font-family: Arial, sans-serif;

  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}
```

---

# 📄 layout.css

```css
.container {
  width: min(100% - 32px, var(--container-width));
  margin-inline: auto;
}

.header {
  padding: 20px 0;
}

.hero {
  padding: 100px 0;
}

.footer {
  padding: 40px 0;
}
```

---

# 📄 components.css

```css
.navbar {
  display: flex;
  gap: 20px;
}

.navbar a {
  transition: var(--transition);
}

.navbar a:hover {
  opacity: 0.7;
}
```

---

# 📄 responsive.css

```css
@media (max-width: 768px) {

  .navbar {
    flex-direction: column;
  }

  .hero {
    padding: 60px 0;
  }

}
```

---

# 📄 projects.json

```json
[
  {
    "title": "Vanilla Website",
    "description": "Pure HTML CSS JS"
  }
]
```

---

# ⚔️ LUẬT THÉP

## 1. Không framework

Cấm:

- React
- Vue
- Angular
- Svelte
- NextJS
- Nuxt

---

## 2. Không dependency

Không npm.

Không node_modules.

Không package.json.

---

## 3. Không CDN

Không:

```html
<script src="https://..."></script>
```

---

## 4. Không inline JS

❌ Sai:

```html
<button onclick="run()">
```

✅ Đúng:

```js
button.addEventListener("click", run);
```

---

## 5. Không inline CSS

❌ Sai:

```html
<div style="color:red">
```

---

## 6. Không global variable

❌ Sai:

```js
let data = [];
```

---

## 7. Tách module rõ ràng

1 file = 1 nhiệm vụ.

---

## 8. Tách data khỏi logic

Data:

```txt
/data/*.json
```

Logic:

```txt
/js/
```

---

## 9. HTML semantic

Luôn dùng:

```html
<header>
<nav>
<main>
<section>
<footer>
```

---

## 10. Chỉ dùng Web APIs native

Được dùng:

- fetch
- localStorage
- sessionStorage
- IntersectionObserver
- querySelector
- addEventListener
- async/await

---

## 11. Tối ưu offline

Website phải chạy:

- Không internet
- Không server
- Không cloud

---

## 12. GitHub Pages compatible

Không dùng:

- SSR
- backend runtime
- Node server

---

## 13. Không phụ thuộc internet

Mọi assets local:

```txt
/assets/img
/assets/fonts
/assets/js
/assets/css
```

---

## 14. Không phụ thuộc version

Không:

```txt
latest
beta
canary
experimental
```

---

## 15. Performance luật thép

### defer JS

```html
<script defer>
```

### lazy image

```html
<img loading="lazy">
```

### webp

Ưu tiên webp hoặc avif.

---

# 🧠 TRIẾT LÝ CUỐI

Framework đổi như thời tiết cyberpunk 🌆

Vanilla JS thì giống dao găm thép đen.

Ít màu mè.
Nhưng 20 năm sau vẫn cắt ngọt.

