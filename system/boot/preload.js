export async function preloadAssets(
  assets=[]
){

  const jobs = assets.map(
    asset => {

      return new Promise(
        resolve => {

          const image =
            new Image();

          image.src = asset;

          image.onload =
            resolve;

          image.onerror =
            resolve;

        }
      );

    }
  );

  await Promise.all(jobs);

} 
