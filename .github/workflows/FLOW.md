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
