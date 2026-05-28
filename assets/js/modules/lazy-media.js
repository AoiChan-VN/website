export function initializeLazyMedia(){

  const assets = [
    ...document.querySelectorAll(
      '[data-lazy-class]'
    )
  ];

  if(!assets.length){
    return;
  }

  const observer =
    new IntersectionObserver(
      (entries) => {

        for(const entry of entries){

          if(!entry.isIntersecting){
            continue;
          }

          const target =
            entry.target;

          const lazyClass =
            target.dataset.lazyClass;

          if(lazyClass){
            target.classList.add(lazyClass);
          }

          observer.unobserve(target);
        }
      },
      {
        threshold:0.08
      }
    );

  for(const asset of assets){
    observer.observe(asset);
  }
} 
