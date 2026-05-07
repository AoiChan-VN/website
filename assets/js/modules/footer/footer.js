import { footerTemplate }
from "./footer.template.js";

export function renderFooter() {

  const target =
    document.getElementById(
      "site-footer"
    );

  target.innerHTML =
    footerTemplate();

} 
