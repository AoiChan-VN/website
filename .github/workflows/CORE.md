# AOI CORE SOURCE

## SOURCE ROLE

Source này chỉ build:

- js/core/
- js/services/
- workers/
- sw.js

CẤM build:

- css/components/
- database/
- content/
- extensions/

---

# CORE RESPONSIBILITY

Source này chịu trách nhiệm:

- app boot
- router
- storage
- worker system
- browser runtime
- cache system
- cookie system
- fetch system
- service worker

---

# BUILD ORDER

1. js/core/
2. js/services/
3. workers/
4. sw.js

Không được nhảy phase.

---

# RULE

CẤM:

- rewrite architecture
- đổi event type
- đổi cache key
- đổi import path
- đổi file structure

Chỉ được:

- extend module
- thêm runtime logic
- optimize system

---

# OUTPUT FORMAT

CURRENT FOLDER:
CURRENT FILE:
BUILD STATUS:
NEXT TARGET:

END OF CORE SOURCE 
