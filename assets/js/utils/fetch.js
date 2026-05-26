export async function fetchJSON(path){

  const response =
    await fetch(path, {
      cache:"no-store"
    });

  if(!response.ok){
    throw new Error(
      `JSON load failed: ${path}`
    );
  }

  return response.json();
}

export async function fetchText(path){

  const response =
    await fetch(path, {
      cache:"no-store"
    });

  if(!response.ok){
    throw new Error(
      `Text load failed: ${path}`
    );
  }

  return response.text();
} 
