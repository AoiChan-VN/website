/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

export function initializeSEO() {

  updateSEO({

    title:
      "AoiChan Portfolio",

    description:
      "Minecraft Plugins Portfolio"

  });

}

export function updateSEO({
  title,
  description
}) {

  document.title = title;

  updateMeta(
    "description",
    description
  );

}

function updateMeta(
  name,
  content
) {

  const target =
    document.querySelector(
      `meta[name="${name}"]`
    );

  if (!target) {
    return;
  }

  target.setAttribute(
    "content",
    content
  );

} 
