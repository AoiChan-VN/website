import Component from '../core/Component.js';
import { navLinks } from '../store/data.js';

export default class Navbar extends Component {
    template() {
        return `
            <div class="nav-container">
                <div class="logo" style="cursor:pointer" onclick="window.location.hash='#/'">DEV.PORTFOLIO</div>
                <ul class="nav-links">
                    ${navLinks.map(link => `
                        <li><a href="#${link.href}">${link.name}</a></li>
                    `).join('')}
                    <li><button id="theme-toggle">🎣👻</button></li>
                </ul>
            </div>
        `;
    }

    setEvent() {
        // Dark Mode vẫn giữ nguyên
        this.$target.querySelector('#theme-toggle').addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const nextTheme = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
        });
    }
}
