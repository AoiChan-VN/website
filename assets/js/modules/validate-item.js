export function validateItem(item) {

  if (!item) {
    return false;
  }

  if (typeof item !== "object") {
    return false;
  }

  if (!item.name) {
    return false;
  }

  if (!item.description) {
    return false;
  }

  if (!item.img) {
    return false;
  }

  return true;

} 
