/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

export function updateMetaTag(
  selector,
  content
) {

  const target =
    document.querySelector(selector);

  if (!target) {
    return;
  }

  target.setAttribute(
    "content",
    content
  );

}

export function updateCanonicalURL(
  path = ""
) {

  const canonical =
    document.querySelector(
      'link[rel="canonical"]'
    );

  if (!canonical) {
    return;
  }

  canonical.href =
    `${location.origin}${path}`;

} 
