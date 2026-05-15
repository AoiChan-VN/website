# AOI UI SOURCE

## SOURCE ROLE

Source này chỉ build:

- js/ui/
- css/core/
- css/themes/
- css/components/
- css/pages/
- assets/images/

CẤM build:

- workers/
- database/
- extensions/
- js/core/

---

# UI RESPONSIBILITY

Source này chịu trách nhiệm:

- layout
- responsive system
- typography
- animation
- sidebar UI
- tabs UI
- browser UI
- settings UI
- theme system

---

# UI SYSTEM LAW

CẤM:

- đổi class name
- đổi id
- đổi data-key
- đổi CSS variable
- merge CSS lung tung

Phải:

- build theo file
- finalize từng file
- giữ đồng bộ naming

---

# UI COMMUNICATION RULE

UI source được phép:

- thêm DOM hook
- thêm data-key
- thêm class structure

để source JS hoặc Extension sử dụng.

NHƯNG:

UI source KHÔNG được:

- viết extension runtime
- viết browser logic
- viết database logic

---

# BUILD ORDER

1. css/core/
2. css/themes/
3. css/components/
4. css/pages/
5. js/ui/

END OF UI SOURCE 
