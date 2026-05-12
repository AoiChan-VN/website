const moduleCache =
  new Map();

export async function lazyImport(
  path
){

  if(
    moduleCache.has(path)
  ){

    return moduleCache.get(path);

  }

  const module =
    await import(path);

  moduleCache.set(
    path,
    module
  );

  return module;

} 
