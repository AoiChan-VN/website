/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

export function injectStructuredData(
  payload
) {

  removeStructuredData();

  const script =
    document.createElement(
      "script"
    );

  script.type =
    "application/ld+json";

  script.id =
    "structured-data";

  script.textContent =
    JSON.stringify(
      payload,
      null,
      2
    );

  document.head.appendChild(
    script
  );

}

function removeStructuredData() {

  const target =
    document.getElementById(
      "structured-data"
    );

  if (!target) {
    return;
  }

  target.remove();

} 
