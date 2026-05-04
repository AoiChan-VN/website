import DOMPurify from 'dompurify';

// Hàm mã hóa/giải mã đơn giản để giấu link gốc
export const obfuscate = (str) => btoa(str); // Mã hóa Base64
export const deobfuscate = (str) => atob(str); // Giải mã

// Chống XSS khi hiển thị dữ liệu từ Plugin/Youtube
export const safeHTML = (content) => DOMPurify.sanitize(content);

// Hàm xử lý Download bảo mật (Chống Direct Link)
export const handleSecureDownload = (encodedLink) => {
  const realLink = deobfuscate(encodedLink);
  
  // Tạo trang chờ ảo hoặc mở link an toàn
  const win = window.open('', '_blank');
  win.opener = null; // Chống tabnabbing (tấn công điều hướng)
  win.location = realLink;
};
