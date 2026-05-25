export function validateItem(item) {

  return (
    typeof item.name === "string"
    && typeof item.description === "string"
    && typeof item.img === "string"
    && typeof item.file === "string"
  );
}
