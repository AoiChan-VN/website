export function getCurrentRoute() {

  const hash =
    window.location.hash;

  if (!hash) {
    return "/";
  }

  return hash.replace("#", "");
}

export function navigate(path) {

  window.location.hash = path;
} 
