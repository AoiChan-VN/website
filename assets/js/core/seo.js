/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

import { updateMetaTag }
from "./meta.js";

import {
  injectStructuredData
}
from "./structured-data.js";

import {
  updateCanonicalURL
}
from "./meta.js";

export function initializeSEO() {

  updateSEO({

    title:
      "AoiChan Portfolio",

    description:
      "Minecraft plugin infrastructure portfolio.",

    path:
      "/"

  });

}

export function updateSEO({

  title = "",

  description = "",

  path = "/"

}) {

  document.title =
    title;

  updateMetaTag(
    'meta[name="description"]',
    description
  );

  updateMetaTag(
    'meta[property="og:title"]',
    title
  );

  updateMetaTag(
    'meta[property="og:description"]',
    description
  );

  updateMetaTag(
    'meta[property="twitter:title"]',
    title
  );

  updateMetaTag(
    'meta[property="twitter:description"]',
    description
  );

  updateCanonicalURL(
    path
  );

  injectStructuredData({

    "@context":
      "https://schema.org",

    "@type":
      "WebSite",

    name:
      title,

    description:
      description,

    url:
      `${location.origin}${path}`

  });

}
