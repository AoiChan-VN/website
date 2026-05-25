export function validateFolder(folder) {

  if (!folder) {
    return false;
  }

  if (typeof folder !== "object") {
    return false;
  }

  if (
    typeof folder.file !== "string"
  ) {
    return false;
  }

  if (
    folder.file.trim() === ""
  ) {
    return false;
  }

  return true;

} 
