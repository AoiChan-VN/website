# AOI Browser Engine

## Core Mission

Xây dựng ứng dụng Browser Shell chạy bằng:

* Vanilla JavaScript
* HTML5
* CSS3
* ES6+
* GitHub Pages
* GitHub Actions
* Không dùng Framework
* Không dùng Build Tool
* Không dùng SPA giả lập
* Không dùng React / Vite / NPM Runtime

Ứng dụng hoạt động như:

* Browser Shell Engine
* Quản lý Tab
* Quản lý Cookie
* Quản lý Extension
* Render Web App
* Chạy trên:

  * Android
  * IOS
  * iPadOS
  * Windows
  * Linux
  * USB Portable

---

# LOCKED SYSTEM

## QUY TẮC CẤM THAY ĐỔI

KHÔNG được thay đổi:

* id
* name
* class
* data-key
* dataset
* folder structure
* file structure
* import path
* variable chuẩn hệ thống
* CSS variable hệ thống

Mọi AI hoặc Dev tiếp theo bắt buộc:

* giữ nguyên toàn bộ cấu trúc
* không rename
* không refactor key hệ thống
* không merge CSS lung tung
* không phá tính đồng bộ

---

# PROJECT TREE

```txt
project-root/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── assets/
│   ├── icons/
│   ├── images/
│   ├── wallpapers/
│   └── extensions/
│
├── content/
│   ├── fantasy/
│   ├── science/
│   └── system/
│
├── database/
│   ├── profile.json
│   ├── fantasy/
│   │   └── frieren/
│   │       └── frieren.json
│   ├── science/
│   └── system/
│
├── extensions/
│   ├── adblock/
│   ├── privacy-guard/
│   ├── dark-mode/
│   └── cookie-control/
│
├── js/
│   ├── core/
│   │   ├── app.boot.js
│   │   ├── app.config.js
│   │   ├── app.router.js
│   │   ├── app.storage.js
│   │   ├── app.worker.js
│   │   ├── app.cookie.js
│   │   ├── app.extension.js
│   │   ├── app.browser.js
│   │   └── app.device.js
│   │
│   ├── modules/
│   │   ├── browser/
│   │   ├── tabs/
│   │   ├── cookie/
│   │   ├── extensions/
│   │   ├── settings/
│   │   └── render/
│   │
│   ├── services/
│   │   ├── profile.service.js
│   │   ├── database.service.js
│   │   ├── cache.service.js
│   │   └── fetch.service.js
│   │
│   ├── ui/
│   │   ├── ui.header.js
│   │   ├── ui.sidebar.js
│   │   ├── ui.browser.js
│   │   ├── ui.tabs.js
│   │   ├── ui.settings.js
│   │   └── ui.extension.js
│   │
│   └── main.js
│
├── css/
│   ├── core/
│   │   ├── reset.css
│   │   ├── root.css
│   │   ├── typography.css
│   │   ├── animation.css
│   │   └── layout.css
│   │
│   ├── themes/
│   │   ├── dark.css
│   │   └── light.css
│   │
│   ├── components/
│   │   ├── header.css
│   │   ├── sidebar.css
│   │   ├── browser.css
│   │   ├── tabs.css
│   │   ├── extension.css
│   │   └── settings.css
│   │
│   ├── pages/
│   │   ├── home.css
│   │   └── dashboard.css
│   │
│   └── utilities/
│       ├── spacing.css
│       ├── flex.css
│       └── visibility.css
│
├── workers/
│   ├── browser.worker.js
│   ├── cache.worker.js
│   ├── extension.worker.js
│   └── render.worker.js
│
├── system/
│   ├── config/
│   ├── cache/
│   ├── storage/
│   └── logs/
│
├── index.html
├── manifest.json
├── sw.js
├── robots.txt
└── README.md
```

---

# DATABASE STRUCTURE

## database/profile.json

```json
[
  {
    "id": "01",
    "name": "fantasy",
    "version": "v1.0",
    "folder": "./fantasy/frieren/frieren.json"
  }
]
```

---

# MAIN CONTENT DATABASE

## database/fantasy/frieren/frieren.json

```json
[
  {
    "id": "01",
    "name": "frieren",
    "image": "./assets/fantasy/frieren/frieren.webp",
    "file": "./content/fantasy/frieren/frieren.md"
  }
]
```

---

# CSS SYSTEM

## COPYRIGHT VARIABLE SYSTEM

```css
:root {
    --aoi-bg: #050505;
    --aoi-rgba: rgba(255,255,255,.08);
    --aoi-primary: #7a5cff;
    --aoi-secondary: #4b8dff;
    --aoi-text: #ffffff;
    --aoi-border: rgba(255,255,255,.12);
    --aoi-radius: 16px;
    --aoi-shadow: 0 8px 24px rgba(0,0,0,.35);
    --aoi-transition: .25s ease;
}
```

---

# APPLICATION PRINCIPLE

## OWNER RESPONSIBILITY

Owner chỉ:

* cung cấp ứng dụng
* tối ưu hiệu suất
* quản lý shell system
* quản lý cookie policy
* quản lý extension system

Owner KHÔNG chịu trách nhiệm:

* GPU người dùng
* CPU người dùng
* FPS người dùng
* RAM người dùng
* nhiệt độ thiết bị
* hiệu suất web bên thứ ba

---

# COOKIE POLICY

Người dùng được:

* bật/tắt chặn third-party cookie
* xoá cookie
* reset cookie session

Hệ thống phải:

* lưu setting local
* không gửi tracking hidden
* không inject analytics trái phép

---

# EXTENSION SYSTEM

## PRINCIPLE

Extension hoạt động dạng module:

* install
* enable
* disable
* uninstall

Không sửa core system.

---

# EXTENSION TREE

```txt
extensions/
└── adblock/
    ├── manifest.json
    ├── rules.json
    ├── adblock.js
    ├── adblock.css
    └── icon.webp
```

---

# EXTENSION MANIFEST

```json
{
  "id": "adblock",
  "name": "AOI AdBlock",
  "version": "1.0.0",
  "author": "AOI",
  "main": "./adblock.js",
  "style": "./adblock.css",
  "rules": "./rules.json",
  "enabled": true
}
```

---

# WEB WORKER SYSTEM

## workers/browser.worker.js

```javascript
'use strict';

self.addEventListener('message', (event) => {

    const payload = event.data;

    if (!payload || !payload.type) {
        return;
    }

    switch (payload.type) {

        case 'CACHE_URL':
            cacheURL(payload.url);
            break;

        case 'CLEAR_CACHE':
            clearCache();
            break;

        case 'PING':
            self.postMessage({
                type: 'PONG',
                timestamp: Date.now()
            });
            break;

        default:
            self.postMessage({
                type: 'ERROR',
                message: 'Unknown worker action'
            });
            break;
    }
});

async function cacheURL(url) {

    try {

        const cache = await caches.open('aoi-browser-cache-v1');

        await cache.add(url);

        self.postMessage({
            type: 'CACHE_SUCCESS',
            url
        });

    } catch (error) {

        self.postMessage({
            type: 'CACHE_ERROR',
            message: error.message
        });
    }
}

async function clearCache() {

    try {

        await caches.delete('aoi-browser-cache-v1');

        self.postMessage({
            type: 'CACHE_CLEARED'
        });

    } catch (error) {

        self.postMessage({
            type: 'CACHE_ERROR',
            message: error.message
        });
    }
}
```

---

# SERVICE WORKER

## sw.js

```javascript
'use strict';

const AOI_CACHE = 'aoi-shell-cache-v1';

const AOI_ASSETS = [
    '/',
    '/index.html',
    '/css/core/root.css',
    '/js/main.js'
];

self.addEventListener('install', (event) => {

    event.waitUntil(
        caches.open(AOI_CACHE)
            .then((cache) => {
                return cache.addAll(AOI_ASSETS);
            })
    );
});

self.addEventListener('fetch', (event) => {

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
```

---

# GITHUB ACTIONS

## .github/workflows/deploy.yml

```yaml
name: AOI Deploy

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

      - name: Deploy
        uses: actions/deploy-pages@v4
```

---

# SECURITY PRINCIPLE

## FORBIDDEN

CẤM:

* eval()
* inline script nguy hiểm
* inject HTML không sanitize
* remote executable script
* hidden crypto mining
* tracking ngầm
* obfuscation độc hại

---

# RENDER ENGINE PRINCIPLE

Ứng dụng chỉ:

* render shell
* quản lý tab
* quản lý extension
* quản lý cookie
* render iframe/webview hợp lệ

Không can thiệp:

* GPU system
* browser engine hardware
* native driver

---

# FINAL RULE

Mọi AI hoặc Dev tiếp tục dự án bắt buộc:

* build đúng tree
* không tự ý đổi key
* không rewrite cấu trúc
* không merge CSS bừa bãi
* không thêm framework
* không thêm build tool
* không phá database structure
* không thêm fake SPA
* hoàn thiện từng file trước khi sang file khác

---

# CHATGPT PROJECT SOURCE MODE

## PURPOSE

Blueprint này KHÔNG phải tài liệu tham khảo.

Blueprint này là:

* SOURCE OF TRUTH
* SYSTEM LAW
* LOCKED ARCHITECTURE
* IMMUTABLE STRUCTURE

Mọi AI ở:

* Project Chat
* New Chat
* Shared Chat
* Imported Chat
* Other AI Platform

đều PHẢI:

* đọc file này trước
* tuân thủ tuyệt đối
* không được suy diễn thêm kiến trúc mới
* không được redesign hệ thống
* không được tự tối ưu cấu trúc khác

---

# ABSOLUTE LOCK MODE

## IMMUTABLE SYSTEM

CẤM TUYỆT ĐỐI:

* đổi tên file
* đổi tên folder
* đổi import path
* đổi CSS variable
* đổi class name
* đổi id
* đổi data-key
* đổi JSON structure
* đổi extension manifest structure
* đổi database schema
* đổi worker event type
* đổi cache key system

AI chỉ được:

* thêm DATA
* thêm CONTENT
* thêm MODULE mới đúng schema
* thêm EXTENSION mới đúng manifest

AI KHÔNG được:

* refactor core
* rewrite architecture
* modernize framework
* convert SPA
* convert TypeScript
* convert React
* convert Vite
* convert npm build system

---

# AI EXECUTION RULE

Khi AI build code:

BẮT BUỘC:

1. Build đúng folder hiện tại
2. Build đúng file hiện tại
3. Final hoàn chỉnh file đó
4. Không sửa file cũ
5. Không regenerate structure
6. Không thêm placeholder
7. Không thêm TODO
8. Không thêm mock code
9. Không thêm demo code
10. Không thêm pseudo-code

Mọi output phải:

* production-ready
* portable
* GitHub Pages compatible
* USB compatible
* static hosting compatible

---

# SOURCE IMPORT RULE

Blueprint này được thiết kế để:

* copy qua mọi phiên chat
* import vào mọi Project ChatGPT
* dùng với mọi AI model
* dùng như System Source

AI đọc blueprint phải hiểu:

* đây là kiến trúc đã CHỐT
* không phải đề xuất
* không phải ví dụ
* không phải concept

---

# SYSTEM IDENTITY

Tên hệ thống:
AoiChan Browser Engine

Engine Type:
Vanilla Static Browser Shell

Architecture Type:
Immutable Modular Static Engine

Runtime:
Native Browser Runtime

Build Type:
No Build Tool

Framework Policy:
Absolute Vanilla Only

Deployment:
GitHub Pages
USB Portable
Static Hosting

END OF MASTER BLUEPRINT
 
