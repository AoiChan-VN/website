import Router from "./core/Router.js";
import DashboardPage from "./pages/DashboardPage.js";

const router = new Router([
  { path: "/", component: DashboardPage },
]);

document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    router.navigate(e.target.href);
  }
});

router.loadRoute(location.pathname); 
