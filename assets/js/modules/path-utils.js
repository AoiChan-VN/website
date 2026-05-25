export function normalizePath(path) {

  if (
    typeof path !== "string"
  ) {
    return "";
  }

  return path
    .trim()
    .replace(/\\/g, "/")
    .replace(/\/{2,}/g, "/");

}

export function isExternalLink(path) {

  if (
    typeof path !== "string"
  ) {
    return false;
  }

  return (
    path.startsWith("http://") ||
    path.startsWith("https://")
  );

}
