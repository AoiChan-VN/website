/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Xuất file tĩnh 100%
  distDir: 'out',   // Thư mục xuất bản
  images: {
    unoptimized: true, // Tương thích với GitHub Pages và Server không có Node.js
  },
  trailingSlash: true, // Tránh lỗi 404 khi F5 trên các server như Nginx/Apache
  reactStrictMode: true, // Kiểm tra lỗi ngầm React
  swcMinify: true, // Nén code mức cao nhất
};

export default nextConfig;
