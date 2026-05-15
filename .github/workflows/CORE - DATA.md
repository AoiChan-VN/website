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

# AOI DATA SOURCE

## SOURCE ROLE

Source này chỉ build:

- database/
- content/

CẤM build:

- js/core/
- workers/
- css/
- extensions/

---

# DATA RESPONSIBILITY

Source này chịu trách nhiệm:

- database schema
- content structure
- json content
- markdown content
- profile system
- fantasy/science content

---

# DATABASE LAW

CẤM:

- đổi JSON structure
- đổi schema key
- rewrite folder tree

Chỉ được:

- append data
- thêm content
- thêm database entry

---

# CONTENT LAW

Content phải:

- portable
- static hosting compatible
- GitHub Pages compatible
- UTF-8 safe

---

# BUILD ORDER

1. database/
2. content/

END OF DATA SOURCE 
