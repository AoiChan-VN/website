/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

const PRELOAD_ASSETS = [

  "/assets/media/backgrounds/hero.webp",

  "/assets/media/icons/icon-192.png"

];

export function preloadAssets() {

  PRELOAD_ASSETS.forEach(asset => {

    const link =
      document.createElement(
        "link"
      );

    link.rel =
      "preload";

    link.as =
      detectAssetType(asset);

    link.href =
      asset;

    document.head.appendChild(
      link
    );

  });

}

function detectAssetType(
  asset
) {

  if (
    asset.endsWith(".webp")
  ) {
    return "image";
  }

  if (
    asset.endsWith(".png")
  ) {
    return "image";
  }

  return "fetch";

} 
