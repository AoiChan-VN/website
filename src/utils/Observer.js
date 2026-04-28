// core/Router.js (Cập nhật phương thức matching)
routing() {
  const path = window.location.pathname;
  const routes = this.routes.map(route => {
    return {
      route,
      fragment: path.match(new RegExp("^" + route.path.replace(/\/:[^\/]+/g, "([^/]+)") + "$"))
    };
  });

  let match = routes.find(r => r.fragment !== null);

  if (!match) {
    match = { route: this.routes[0], fragment: [path] };
  }

  // Lấy params (ví dụ: id) từ URL
  const params = match.fragment.slice(1); 
  const $app = document.querySelector('#app');
  new match.route.view($app, { params });
}
