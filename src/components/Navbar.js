import Component from '../core/Component.js';
import { navLinks } from '../store/data.js';

export default class Navbar extends Component {
    template() {
        return `
            <div class="nav-container">
                <div class="logo" style="cursor:pointer" data-path="/">DEV.PORTFOLIO</div>
                <ul class="nav-links">
                    ${navLinks.map(link => `
                        <li><a href="${link.href}" data-path="${link.href}">${link.name}</a></li>
                    `).join('')}
                    <li><button id="theme-toggle">👻</button></li>
                </ul>
            </div>
        `;
    }

    setEvent() {
        // Xử lý Dark Mode
        this.$target.querySelector('#theme-toggle').addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const nextTheme = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
        });

        // Điều hướng không load trang (SPA)
        this.$target.addEventListener('click', (e) => {
            const target = e.target.closest('[data-path]');
            if (target) {
                e.preventDefault();
                const path = target.getAttribute('data-path');
                window.dispatchEvent(new CustomEvent('navigate', { detail: path }));
            }
        });
    }
}
