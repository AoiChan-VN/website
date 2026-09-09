# HOYOAO-3RD — MASTER PROJECT STRUCTURE
## DOD / DDD / DDA / DCL AAA PRODUCTION BLUEPRINT

Version: 1.0  
Target: HoyoAO-3rd  
Engine: Godot 4.7.2 Stable  
Language Stack: C++ Native Core + GDExtension + GDScript Presenter  
Platform: Mobile First — Android Physical Devices  
Reference Repos:
- https://github.com/godotengine/godot.git
- https://github.com/godotengine/godot-cpp.git

---

## 1. DESIGN PHILOSOPHY

Dự án HoyoAO-3rd được thiết kế theo triết lý AAA Action ARPG hiện đại:

1. **C++ là nguồn chân lý**
   - Canonical state nằm trong C++.
   - Save file trên máy người chơi chỉ là sealed export.
   - GDScript không được trực tiếp sửa dữ liệu nhạy cảm.

2. **GDScript là tầng trình diễn**
   - UI.
   - Input.
   - Scene flow.
   - Animation/VFX reaction.
   - Snapshot consumption.

3. **Content-driven architecture**
   - Nhân vật, vũ khí, skill, item, enemy, stage được định nghĩa bằng data.
   - Hạn chế hardcode logic vào scene hoặc UI.
   - Hỗ trợ package/manifest để mở rộng nội dung.

4. **Mobile-first performance**
   - Target device thật Android.
   - Không lấy PC/emulator làm chuẩn.
   - Kiểm soát drawcall, overdraw, memory, thermal.

5. **Security by design**
   - Zero-Trust Local Storage.
   - No plaintext user data.
   - Authenticated encryption.
   - Anti-memory edit.
   - Anti-rollback.

---

## 2. FOUR ARCHITECTURE PILLARS

### 2.1. DCL — Domain Core / Contract Layer

DCL là tầng luật lõi của toàn bộ hệ thống.

Trách nhiệm:

- Định nghĩa canonical schema.
- Định nghĩa command envelope.
- Định nghĩa event contract.
- Định nghĩa ID domain.
- Quản lý secure storage.
- Quản lý crypto envelope.
- Quản lý audit log.
- Quản lý owner authentication.
- Quản lý economy ledger authority.

Nơi đặt DCL:

- C++ Core.
- `aoi-cpp/src/core/`
- `aoi-cpp/src/crypto/`
- `aoi-cpp/src/save_vault/`
- `aoi-cpp/src/gdext_boundary/`

DCL không được:

-Expose raw memory sang GDScript.
-Expose key/material sang GDScript.
-Cho phép GDScript tự ý ghi đè canonical state.
-Cho phép UI sửa trực tiếp economy/save/ownership.

---

### 2.2. DDD — Domain-Driven Design Layer

DDD chia hệ thống thành các bounded context rõ ràng.

Các domain chính:

1. **SaveVaultDomain**
   - Lưu canonical state.
   - Xuất/nhập sealed save.
   - Validate schema.
   - Chống rollback.

2. **EconomyDomain**
   - Currency.
   - Transaction.
   - Grant.
   - Consume.
   - Audit.

3. **OwnershipDomain**
   - Nhân vật sở hữu.
   - Vũ khí sở hữu.
   - Item sở hữu.
   - Package ownership.

4. **ProgressionDomain**
   - Level.
   - Exp.
   - Upgrade.
   - Ascension.
   - Skill unlock.

5. **CombatSimDomain**
   - Intent validation.
   - Skill activation.
   - Combo state.
   - Hit confirmation.
   - Reaction event.

6. **OwnerConsoleDomain**
   - Command parse.
   - Authorization.
   - Execution.
   - Audit.

7. **QualityGovernorDomain**
   - Quality preset authority.
   - FPS cap.
   - Resolution scale.
   - Shadow/LOD/VFX density control.

8. **ContentManifestDomain**
   - Manifest validation.
   - Package mount.
   - Ownership state.
   - Patch readiness.

Nơi đặt DDD:

- C++ domain services:
  - `aoi-cpp/src/save_vault/`
  - `aoi-cpp/src/econ/`
  - `aoi-cpp/src/owner_console/`
  - `aoi-cpp/src/quality_governor/`
  - `aoi-cpp/src/combat_sim/`
  - `aoi-cpp/src/content_domain/`
- Godot resource definitions:
  - `res://defs/`
- Godot service facade:
  - `res://sys/services/`

---

### 2.3. DDA — Data-Driven Assets / Authoring Layer

DDA là tầng nội dung và tài nguyên được authoring bởi designer/artist.

Trách nhiệm:

- Định nghĩa static data.
- Tạo manifest.
- Đóng gói content package.
- Quản lý localization.
- Quản lý quality preset data.
- Cung cấp dữ liệu cho DDD validate và DOD runtime.

DDA không được:

- Chứa runtime mutable state.
- Chứa logic economy authority.
- Chứa save vault.
- Chứa crypto key.
- Ghi đè canonical state.

Nơi đặt DDA:

- `res://defs/`
- `res://content/`
- `res://cfg/`
- `res://locales/`

---

### 2.4. DOD — Data-Oriented Design Runtime Layer

DOD là tầng runtime tối ưu cho game action tần suất cao.

Trách nhiệm:

- Xử lý combat simulation theo data block.
- Dùng pool cho VFX/audio/particle.
- Dùng cached hit volume.
- Dùng snapshot double-buffer.
- Giảm allocation trong frame nóng.
- Đảm bảo deterministic validation.
- Hạn chế spam physics query mỗi frame.

Nơi đặt DOD:

- Gameplay runtime:
  - `res://gameplay/`
- Combat view:
  - `res://combat/`
- VFX pool:
  - `res://fx/`
- C++ simulation:
  - `aoi-cpp/src/combat_sim/`

DOD không được:

- Cho phép UI gọi ngược vào simulation.
- Cho phép VFX tự spawn vô hạn không kiểm soát.
- Cho phép fake combat bằng dummy logic không qua validation.
- Cho phép mỗi frame tạo allocation lớn không cần thiết.

---

## 3. HIGH-LEVEL DATA FLOW
 
