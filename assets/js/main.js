import { initTheme } from "./modules/theme.js";
import { initNavbar } from "./modules/navbar.js";

function bootstrap() {
  initTheme();
  initNavbar();
}

document.addEventListener("DOMContentLoaded", bootstrap); 
