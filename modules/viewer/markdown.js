export async function loadMarkdown(path) {

  const response = await fetch(path);

  if (!response.ok) {
    throw new Error('Markdown load failed');
  }

  return await response.text();
} 
