# Kiến Trúc Browser Cá Nhân Chuẩn Sạch Cho Vanilla JS ES6

> Mục tiêu thật sự không phải “ít file”.
>
> Mục tiêu là:
>
> - dễ scale
> - dễ sửa
> - dễ thay module
> - dễ debug
> - dễ maintain 5 năm sau
> - không biến thành đống spaghetti JavaScript ☠️

---

# Triết Lý Kiến Trúc

Sai lầm phổ biến:

- nhét logic vào app.js
- CSS viết 1 file dài 5000 dòng
- utility + UI + state trộn chung
- component giả nhưng không tách module
- query DOM khắp nơi
- config hardcode mọi nơi

Kết quả:

🔥 sửa 1 chỗ vỡ 10 chỗ
🔥 memory leak
🔥 dependency vòng tròn
🔥 không scale nổi
🔥 AI generate càng lúc càng bẩn

---

# Kiến Trúc Đúng

```txt
/browser-app
│
├── index.html
│
├── assets/
│   ├── css/
│   │   ├── base/
│   │   │   ├── reset.css
│   │   │   ├── variables.css
│   │   │   └── typography.css
│   │   │
│   │   ├── layout/
│   │   │   ├── header.css
│   │   │   ├── sidebar.css
│   │   │   ├── viewer.css
│   │   │   └── responsive.css
│   │   │
│   │   ├── components/
│   │   │   ├── buttons.css
│   │   │   ├── inputs.css
│   │   │   ├── tabs.css
│   │   │   └── modal.css
│   │   │
│   │   └── main.css
│   │
│   ├── js/
│   │   ├── core/
│   │   │   ├── engine.js
│   │   │   ├── router.js
│   │   │   ├── storage.js
│   │   │   ├── validator.js
│   │   │   └── event-bus.js
│   │   │
│   │   ├── modules/
│   │   │   ├── tabs/
│   │   │   │   ├── tabs.js
│   │   │   │   ├── tabs-ui.js
│   │   │   │   └── tabs-state.js
│   │   │   │
│   │   │   ├── viewer/
│   │   │   │   ├── viewer.js
│   │   │   │   ├── viewer-ui.js
│   │   │   │   └── viewer-renderer.js
│   │   │   │
│   │   │   ├── navbar/
│   │   │   │   ├── navbar.js
│   │   │   │   └── navbar-events.js
│   │   │   │
│   │   │   └── history/
│   │   │       ├── history.js
│   │   │       └── history-storage.js
│   │   │
│   │   ├── services/
│   │   │   ├── search-service.js
│   │   │   ├── settings-service.js
│   │   │   └── theme-service.js
│   │   │
│   │   ├── state/
│   │   │   ├── app-state.js
│   │   │   ├── tabs-state.js
│   │   │   └── history-state.js
│   │   │
│   │   ├── utils/
│   │   │   ├── dom.js
│   │   │   ├── helpers.js
│   │   │   ├── sanitizer.js
│   │   │   ├── debounce.js
│   │   │   └── constants.js
│   │   │
│   │   ├── config/
│   │   │   ├── app-config.js
│   │   │   ├── routes.js
│   │   │   └── permissions.js
│   │   │
│   │   ├── bootstrap/
│   │   │   └── app-bootstrap.js
│   │   │
│   │   └── main.js
│   │
│   ├── icons/
│   ├── fonts/
│   └── images/
│
├── data/
│   ├── bookmarks.json
│   ├── settings.json
│   └── search-engines.json
│
├── docs/
│   ├── architecture.md
│   ├── coding-rules.md
│   └── api.md
│
├── .gitignore
├── README.md
└── LICENSE
```

---

# Đây Mới Là Structure Sạch

Vì:

| Loại | Được Tách Riêng |
|---|---|
| UI | components + layout |
| Logic | modules |
| State | state/ |
| Engine | core/ |
| Config | config/ |
| Helper | utils/ |
| Service | services/ |
| Bootstrap | bootstrap/ |
| Static Assets | assets/ |
| Data | data/ |
| Docs | docs/ |

---

# Nguyên Tắc Vàng

## 1. Một File = Một Trách Nhiệm

Ví dụ:

❌ Sai:

```js
app.js
```

chứa:

- tabs
- history
- render
- storage
- search
- settings
- event

Đây là “thùng rác logic”.

---

✅ Đúng:

```txt
viewer-renderer.js
```

chỉ render viewer.

```txt
tabs-state.js
```

chỉ quản lý state tabs.

```txt
search-service.js
```

chỉ xử lý search.

---

# Module Pattern Chuẩn

## viewer.js

```javascript
'use strict';

import { ViewerRenderer } from './viewer-renderer.js';
import { AppState } from '../../state/app-state.js';

export class Viewer {

    static navigate(url) {

        AppState.currentURL = url;

        ViewerRenderer.render(url);

    }

}
```

---

# Renderer Tách Riêng

## viewer-renderer.js

```javascript
'use strict';

export class ViewerRenderer {

    static render(url) {

        const viewer = document.querySelector('#viewer');

        viewer.textContent = '';

        const text = document.createElement('p');

        text.textContent = url;

        viewer.appendChild(text);

    }

}
```

---

# State Không Được Random

## app-state.js

```javascript
'use strict';

export const AppState = {

    currentURL: '',

    activeTab: null,

    isLoading: false,

    tabs: []

};
```

---

# DOM Utility Riêng

## dom.js

```javascript
'use strict';

export const DOM = Object.freeze({

    get(selector) {
        return document.querySelector(selector);
    },

    create(tag) {
        return document.createElement(tag);
    }

});
```

---

# Bootstrap App Đúng Chuẩn

## app-bootstrap.js

```javascript
'use strict';

import { Navbar } from '../modules/navbar/navbar.js';
import { Viewer } from '../modules/viewer/viewer.js';

export class AppBootstrap {

    static init() {

        Navbar.init();

        Viewer.navigate('home');

    }

}
```

---

# main.js

```javascript
'use strict';

import { AppBootstrap } from './bootstrap/app-bootstrap.js';

window.addEventListener('DOMContentLoaded', () => {

    AppBootstrap.init();

});
```

---

# CSS Kiến Trúc Đúng

Sai lầm phổ biến:

```txt
style.css
```

8000 dòng 💀

---

Phải tách:

| Folder | Vai Trò |
|---|---|
| base | reset + variables |
| layout | page layout |
| components | button/input/tab |
| responsive | media query |

---

# Import CSS Chuẩn

## main.css

```css
@import './base/reset.css';
@import './base/variables.css';
@import './base/typography.css';

@import './layout/header.css';
@import './layout/sidebar.css';
@import './layout/viewer.css';
@import './layout/responsive.css';

@import './components/buttons.css';
@import './components/inputs.css';
@import './components/tabs.css';
```

---

# Chuẩn ES6 Module

Trong HTML:

```html
<script type="module" src="./assets/js/main.js"></script>
```

Không dùng:

❌ namespace global
❌ window pollution
❌ script chain hỗn loạn

---

# Quy Tắc Scale Lâu Dài

## Không File Nào Quá 300 Dòng

Nếu vượt:

→ tách module.

---

## Không Function Quá 40 Dòng

Nếu vượt:

→ split logic.

---

## Không Nested Quá 3 Level

Nếu vượt:

→ redesign.

---

## Không Module Circular Dependency

Nếu có:

→ kiến trúc đang sai.

---

# Security Architecture

## Tuyệt Đối Cấm

- eval()
- new Function()
- inline onclick
- innerHTML từ user input
- CDN script
- remote JS
- dynamic import không kiểm soát

---

# Offline-First Rules

Browser app phải:

✅ chạy GitHub Pages
✅ chạy file:/// 
✅ chạy localhost
✅ chạy USB
✅ không internet
✅ không build step
✅ không install package

---

# Tại Sao Kiến Trúc Này Sống Lâu

Vì nó không phụ thuộc:

- trend frontend
- npm ecosystem
- framework lifecycle
- build tool
- cloud runtime
- bundler

Nó chỉ phụ thuộc:

- HTML5
- CSS3
- JavaScript ES6

Ba thứ gần như bất tử trong thế giới web 🌑

