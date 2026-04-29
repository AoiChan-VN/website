// src/app.js
import Router from "./core/Router.js";
import Navbar from "./components/shared/Navbar.js";
import Modal from "./components/shared/Modal.js";
import Toast from "./components/shared/Toast.js";

import DashboardPage from "./pages/DashboardPage.js";
import PluginPage from "./pages/PluginPage.js";
import ResourcePage from "./pages/ResourcePage.js";

import store from "./core/Store.js";

// Mount shared UI
new Navbar({ target: document.querySelector("#navbar") });
new Modal({ target: document.body });
new Toast({ target: document.body });

// Router
const router = new Router([
  { path: "/", component: DashboardPage },
  { path: "/plugins", component: PluginPage },
  { path: "/resources", component: ResourcePage },
]);

// Link handler
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (!link) return;

  e.preventDefault();
  router.navigate(link.getAttribute("href"));
});

router.loadRoute(location.pathname);

// 🔥 Fake realtime server
setInterval(() => {
  store.state.serverStatus = {
    cpu: Math.floor(Math.random() * 100),
    ram: Math.floor(Math.random() * 16000),
    players: Math.floor(Math.random() * 100),
  };
}, 2000);
