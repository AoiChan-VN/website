/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

export function sanitizeHTML(content) {

  const wrapper =
    document.createElement("div");

  wrapper.textContent = content;

  return wrapper.innerHTML;

}

export function validateURL(url) {

  try {

    new URL(url);

    return true;

  } catch {

    return false;

  }

} 
