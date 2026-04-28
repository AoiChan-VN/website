import Component from './core/Component.js';
import { projects, navLinks } from './store/data.js';

class App extends Component {
    template() {
        return `
            <nav id="navbar"></nav>
            <main>
                <section id="hero">
                    <h1>Xin chào, tôi là Developer</h1>
                    <p>Xây dựng web app với hiệu năng tối đa.</p>
                </section>
                <section id="projects">
                    <h2>Dự án tiêu biểu</h2>
                    <div id="project-list" class="grid"></div>
                </section>
            </main>
        `;
    }

    // Sau khi App render xong khung, ta nạp các component con vào
    render() {
        super.render();
        // Logic render các sub-components sẽ viết tiếp ở bước sau...
        console.log("App đã sẵn sàng!");
    }
}

// Khởi tạo ứng dụng tại thẻ #app
new App(document.querySelector('#app'));
 
