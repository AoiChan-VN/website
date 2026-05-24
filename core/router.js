export async function loadView(modulePath) {
  return await import(modulePath);
} 
