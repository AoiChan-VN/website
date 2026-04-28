export default class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }
    init() {
        window.addEventListener('popstate', () => this.render());
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                history.pushState(null, null, e.target.href);
                this.render();
            }
        });
        this.render();
    }
    render() {
        const route = this.routes[location.pathname] || this.routes['/404'];
        document.querySelector('#app').innerHTML = route.template();
    }
}
 
