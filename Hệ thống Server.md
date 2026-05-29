🌌 BẢN ĐẶC TẢ LUẬT VÀ QUY TẮC TUYỆT ĐỐI KHI PHÁT TRIỂN MINECRAFT PLUGIN

Mục tiêu: Phát triển Plugin tối ưu hiệu năng tối đa (Zero-Lag), không rò rỉ bộ nhớ, kiến trúc sạch, an toàn tuyệt đối trước các đợt tấn công khai thác (Exploit) và tương thích hoàn hảo từ ổ cứng cục bộ, USB cho đến môi trường máy chủ Linux/Windows.

🛑 MỤC I: NHỮNG ĐIỀU CẤM TUYỆT ĐỐI (STRICT PROHIBITIONS)

1. CẤM Chạy Tác Vụ Nặng Trên Luồng Chính (No Heavy Main Thread Operations):
> 1. Cấm thực hiện các truy vấn cơ sở dữ liệu (MySQL, SQLite, MongoDB), đọc/ghi file (config.yml, dữ liệu người chơi), hoặc kết nối mạng (HTTP Request) trên Main Thread.
> 2. Cấm tính toán các thuật toán phức tạp vòng lặp lớn (như tìm đường dẫn Pathfinding tùy chỉnh, quét diện rộng hàng triệu Block) mà không phân mảnh ra luồng bất đồng bộ (BukkitRunnable#runTaskAsynchronously).

2. CẤM Rò Rỉ Bộ Nhớ Cố Ý (Zero Memory Leak):
> 1. Cấm lưu trữ trực tiếp thực thể Player hoặc các đối tượng chứa vị trí Location, World vào các tập hợp tĩnh (Static Map, List, Set). Chỉ được phép lưu trữ UUID hoặc String tên của người chơi.
> 2. Cấm giữ lại tham chiếu của các trình lắng nghe sự kiện (Listener) động hoặc các tác vụ chạy ngầm (BukkitTask) khi Plugin bị tắt (onDisable()). Tất cả phải được hủy (HandlerList.unregisterAll(), Bukkit.getScheduler().cancelTasks()).

3. CẤM Sử Dụng Phản Chiếu Cứng Nhắc (No Hardcoded NMS / CraftBukkit):
> 1. Cấm gọi trực tiếp các package net.minecraft.server (NMS) hoặc org.bukkit.craftbukkit phiên bản cố định (ví dụ: v1_20_R1). Mọi tính năng can thiệp sâu vào gói tin (Packets) bắt buộc phải qua thư viện can thiệp tầng ngoài (như ProtocolLib) hoặc sử dụng cơ chế phản chiếu động (Reflection/Mojo) đa phiên bản.

4. CẤM Code Ví Dụ Hoặc Viết Bình Luận Trốn Việc:
> 1. Cấm xuất mã nguồn chứa các đoạn code tượng trưng, code không chạy được hoặc chứa các dòng ghi chú như: // Viết tiếp logic xử lý tại đây, /* TODO: Xử lý lưu database */. Mã nguồn xuất ra phải hoạt động ngay lập tức (Plug and Play).

5. CẤM Lạm Dụng Vòng Lặp Vô Hạn Hoặc Tick Biên Độ Cao:
> 1. Cấm tạo các tác vụ lặp lại liên tục với chu kỳ 1 tick (runTaskTimer với delay = 1) trừ khi đó là các hiệu ứng hạt (Particles) hoặc cơ chế vật lý đặc biệt bắt buộc.

📜 MỤC II: NHỮNG ĐIỀU BẮT BUỘC PHẢI LÀM (MANDATORY EXECUTION)
1. LUÔN Đóng Gói Và Giải Phóng Tài Nguyên Khắt Khe:
> 1. Trong phương thức onDisable(), bắt buộc phải lưu toàn bộ dữ liệu đang cache trên RAM xuống đĩa, đóng mọi kết nối cơ sở dữ liệu (Database Connections), hủy toàn bộ Scheduler động để đảm bảo tính năng Reload (/reload) của Server không gây tràn bộ nhớ (Heap Memory).

2. LUÔN Kiểm Tra Điều Kiện Hợp Lệ Trước (Pre-Condition Checking):
> 1. Trong các Sự kiện (Event), luôn phải kiểm tra tính hợp lệ trước khi thực hiện logic (ví dụ: kiểm tra entity != null, player.isOnline(), event.isCancelled()).
> 2. Đối với các sự kiện tương tác vật phẩm/khối (PlayerInteractEvent), bắt buộc phải kiểm tra hành động (Action) và kiểm tra xem người chơi có thực sự cầm vật phẩm trên tay hay không để tránh lỗi con trỏ Null (NullPointerException).

3. LUÔN Đảm Bảo An Toàn Đa Luồng (Thread-Safety):
> 1. Khi xử lý dữ liệu bất đồng bộ (Async Task), nếu muốn tác động ngược lại vào thế giới Game (như đặt Block, dịch chuyển Player, gây sát thương, mở Menu Inventory), bắt buộc phải đẩy logic đó quay trở lại luồng chính thông qua Bukkit.getScheduler().runTask().

4. LUÔN Thiết Kế Giao Diện (UI/GUI) Bằng Phương Pháp Đánh Dấu Cục Bộ:
> 1. Khi tạo Menu ảo (Custom Inventory), bắt buộc phải gán mã định danh duy nhất (qua Title, Custom Holder, hoặc PersistentDataContainer) để nhận diện chính xác giao diện của Plugin, ngăn chặn triệt để lỗi người chơi có thể lấy trộm vật phẩm từ trong Menu ra ngoài.

5. LUÔN Hỗ Trợ Đa Ngôn Ngữ Native (Localization):
> 1. Toàn bộ tin nhắn, tiêu đề (Titles), dòng mô tả vật phẩm (Lore) không được viết cứng trong code. Tất cả phải được phân tách ra file messages.yml hoặc config.yml sử dụng mã màu chuẩn (& hoặc mã Hex &#ffffff) thông qua hàm dịch chuỗi ChatColor.translateAlternateColorCodes().

💻 MỤC III: TIÊU CHUẨN KIẾN TRÚC & TỐI ƯU HÓA (TECHNICAL SPECIFICATIONS)
1. Kiến Trúc Quản Lý Dữ Liệu Bộ Nhớ Đệm (Caching Layer):
> 1. Sử dụng các cấu trúc lưu trữ tối ưu hiệu năng cao như ConcurrentHashMap nếu dữ liệu được truy cập từ nhiều luồng. Đối với các dữ liệu tạm thời (như thời gian hồi chiêu - Cooldown), phải có cơ chế tự động dọn dẹp hoặc hết hạn (như sử dụng Guava Cache).

2. Lưu Trữ Dữ Liệu Thực Thể Hiện Đại:
> 1. Ưu tiên sử dụng PersistentDataContainer (PDC) có sẵn của Spigot/Paper để đính kèm dữ liệu trực tiếp vào Item, Entity, hoặc Chunk thay vì tạo các file lưu trữ thủ công phức tạp. Điều này giúp dữ liệu tự động đi theo thực thể khi di chuyển qua các thế giới hoặc khi Server khởi động lại.

3. Tối Ưu Hóa Truy Vấn Khối (Block Manipulation):
> 1. Khi cần thay đổi hàng loạt Block (như tạo công trình, xóa vùng đất), cấm dùng lệnh Block#setType() thông thường của Bukkit trên số lượng lớn. Phải can thiệp qua EditSession (nếu dùng WorldEdit API) hoặc sử dụng các giải pháp thay đổi trực tiếp cấu trúc Chunk (ChunkSnapshot / NMS) để tránh sập TPS của Server.

4. Kỷ Luật Phản Hồi Kết Xuất Mã Nguồn:
> 1. AI khi nhận lệnh build Plugin phải xuất ra cấu trúc thư mục rõ ràng: File chính kế thừa JavaPlugin, các Class Listener, các Class CommandExecutor, và cấu trúc file plugin.yml, config.yml.
