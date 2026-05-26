import { createElement }
from "../utils/dom.js";

export function createHeader(){

  const header =
    createElement(
      "header",
      "app-header"
    );

  const title =
    createElement(
      "h1",
      "logo-title",
      "AoiChan"
    );

  const subtitle =
    createElement(
      "p",
      "hero-subtitle",
      "IOS • Anime • Huyền Huyễn • 3D Experience"
    );

  header.append(
    title,
    subtitle
  );

  return header;
} 
