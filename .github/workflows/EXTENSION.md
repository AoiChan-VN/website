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
