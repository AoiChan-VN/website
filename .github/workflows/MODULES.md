# AOI MODULE SOURCE

## SOURCE ROLE

Source này chỉ build:

- js/modules/browser/
- js/modules/tabs/
- js/modules/cookie/
- js/modules/settings/
- js/modules/render/

CẤM build:

- css/
- database/
- workers/
- sw.js

---

# MODULE RESPONSIBILITY

Source này chịu trách nhiệm:

- browser feature
- tabs manager
- render runtime
- settings manager
- cookie manager
- runtime module logic

---

# MODULE LAW

Modules phải:

- hoạt động độc lập
- không rewrite core
- không sửa worker system
- không phá storage system

---

# MODULE CONNECTION

Modules được phép dùng:

- DOM hook từ UI source
- API từ CORE source
- data schema từ DATA source

Nhưng KHÔNG được sửa source gốc.

END OF MODULE SOURCE
