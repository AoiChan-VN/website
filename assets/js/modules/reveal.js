import {
  prefersReducedMotion
} from '../core/device.js';

export function initializeReveal(){

  if(prefersReducedMotion()){

    const sections = [
      ...document.querySelectorAll('.reveal')
    ];

    for(const section of sections){
      section.classList.add('reveal-active');
    }

    return;
  }

  const observer =
    new IntersectionObserver(
      (entries) => {

        for(const entry of entries){

          if(!entry.isIntersecting){
            continue;
          }

          entry.target.classList.add(
            'reveal-active'
          );

          observer.unobserve(entry.target);
        }
      },
      {
        threshold:0.16,
        rootMargin:'0px 0px -8% 0px'
      }
    );

  const sections = [
    ...document.querySelectorAll('.reveal')
  ];

  for(const section of sections){
    observer.observe(section);
  }
} 
