export function sanitizeText(value) {

  if (typeof value !== "string") {
    return "";
  }

  const div =
    document.createElement("div");

  div.textContent = value;

  return div.innerHTML;

} 
