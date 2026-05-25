export function normalizePath(path) {

  if (
    typeof path !== "string" ||
    path.trim() === ""
  ) {
    return "";
  }

  return path
    .replace(/\\/g, "/")
    .replace(/\/{2,}/g, "/");

} 
