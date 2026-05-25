import {
  normalizePath,
  isExternalLink
}
from "./path-utils.js";

export function validateItem(item) {

  if (!item) {
    return false;
  }

  if (typeof item !== "object") {
    return false;
  }

  if (
    typeof item.name !== "string" ||
    item.name.trim() === ""
  ) {
    return false;
  }

  if (
    typeof item.description !== "string"
  ) {
    return false;
  }

  if (
    typeof item.img !== "string" ||
    item.img.trim() === ""
  ) {
    return false;
  }

  item.img =
    normalizePath(item.img);

  if (item.file) {

    item.file =
      normalizePath(item.file);

  }

  if (
    item.link &&
    !isExternalLink(item.link)
  ) {

    item.link =
      normalizePath(item.link);

  }

  return true;

}
