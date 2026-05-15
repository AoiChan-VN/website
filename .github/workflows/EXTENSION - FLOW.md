# AOI EXTENSION SOURCE

## SOURCE ROLE

Source này chỉ build:

- extensions/
- js/modules/extensions/
- js/core/app.extension.js

CẤM build:

- css/core/
- database/
- workers/

---

# EXTENSION RESPONSIBILITY

Source này chịu trách nhiệm:

- extension runtime
- extension install
- extension enable
- extension disable
- extension uninstall
- extension manifest

---

# EXTENSION LAW

Mọi extension phải:

- đúng manifest schema
- không sửa core system
- không inject hidden tracking
- không dùng eval()
- không dùng remote executable script

---

# EXTENSION TREE LAW

Mọi extension bắt buộc:

extensions/
└── extension-name/
    ├── manifest.json
    ├── extension.js
    ├── extension.css
    ├── rules.json
    └── icon.webp

---

# EXTENSION ISOLATION

Extension chỉ được:

- hook vào API system
- dùng DOM hook
- dùng extension loader

CẤM:

- rewrite app core
- overwrite runtime
- sửa worker event

END OF EXTENSION SOURCE 

# AOI BUILD FLOW

## BUILD PIPELINE

PHASE 1

SYSTEM CORE

- js/core/
- js/services/
- workers/
- sw.js

---

PHASE 2

UI SYSTEM

- css/core/
- css/themes/
- css/components/
- css/pages/
- js/ui/

---

PHASE 3

MODULE SYSTEM

- js/modules/browser/
- js/modules/tabs/
- js/modules/settings/
- js/modules/render/

---

PHASE 4

EXTENSION SYSTEM

- extensions/
- app.extension.js

---

PHASE 5

DATABASE + CONTENT

- database/
- content/

---

# EXECUTION RULE

Khi build:

1. Build đúng folder hiện tại
2. Hoàn thiện toàn bộ file trong folder
3. Lock folder
4. Chuyển folder tiếp theo

CẤM:

- build nhảy folder
- regenerate structure
- rewrite source khác

---

# CHATGPT FREE OPTIMIZATION

AI bắt buộc:

- build incremental
- output tối thiểu cần thiết
- không dump toàn source
- không lặp code cũ
- không explain dư thừa

Mục tiêu:

- tránh rate limit
- tránh token overflow
- giữ ổn định context

END OF BUILD FLOW 
