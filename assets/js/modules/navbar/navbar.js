import { navbarTemplate }
from "./navbar.template.js";

import { toggleTheme }
from "../../core/theme.js";

export function renderNavbar() {

  const target =
    document.getElementById(
      "site-header"
    );

  target.innerHTML =
    navbarTemplate();

  bindNavbarEvents();

}

function bindNavbarEvents() {

  const toggleButton =
    document.getElementById(
      "theme-toggle"
    );

  if (!toggleButton) {
    return;
  }

  toggleButton.addEventListener(
    "click",
    toggleTheme
  );

} 
