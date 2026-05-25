export async function fetchJSON(path){

  const response = await fetch(path);

  if(!response.ok){
    throw new Error(`JSON Error: ${path}`);
  }

  return response.json();
}

export async function fetchText(path){

  const response = await fetch(path);

  if(!response.ok){
    throw new Error(`TEXT Error: ${path}`);
  }

  return response.text();
} 
