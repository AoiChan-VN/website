/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        panel: '#0f172a', // Màu nền Dashboard sâu
        primary: '#3b82f6', // Xanh chuẩn quốc tế
      },
      screens: {
        'xs': '320px', // Hỗ trợ điện thoại siêu nhỏ
      }
    },
  },
  plugins: [],
}
