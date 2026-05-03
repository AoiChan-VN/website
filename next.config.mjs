/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Quan trọng: Xuất ra HTML/CSS/JS thuần
  images: {
    unoptimized: true, // Bắt buộc cho GitHub Pages
  },
  trailingSlash: true, // Giúp URL hoạt động tốt trên máy chủ Apache/Nginx
};

export default nextConfig;
 
