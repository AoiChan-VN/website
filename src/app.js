// src/app.js
import Router from "./core/Router.js";

import Navbar from "./components/shared/Navbar.js";
import Modal from "./components/shared/Modal.js";
import Toast from "./components/shared/Toast.js";

import DashboardPage from "./pages/DashboardPage.js";
import PluginPage from "./pages/PluginPage.js";
import ResourcePage from "./pages/ResourcePage.js";

// Mount global UI
new Navbar({ target: document.querySelector("#navbar") });
new Modal({ target: document.body });
new Toast({ target: document.body });

// Router init
const router = new Router([
  { path: "/", component: DashboardPage },
  { path: "/plugins", component: PluginPage },
  { path: "/resources", component: ResourcePage },
]);

router.start();
