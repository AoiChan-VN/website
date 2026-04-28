import Component from '../core/Component.js';
import { navLinks } from '../store/data.js';

export default class Navbar extends Component {
    template() {
        return `
            <div class="nav-container">
                <div class="logo">PORTFOLIO.</div>
                <ul class="nav-links">
                    ${navLinks.map(link => `
                        <li><a href="${link.href}">${link.name}</a></li>
                    `).join('')}
                    <li><button id="theme-toggle">👻</button></li>
                </ul>
            </div>
        `;
    }

    setEvent() {
        // Tính năng Dark Mode thực tế
        this.$target.querySelector('#theme-toggle').addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme); // Lưu lại lựa chọn của người dùng
        });

        // Xử lý cuộn mượt khi click link
        this.$target.querySelectorAll('a').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if(targetId === '#') return;
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
}
 
