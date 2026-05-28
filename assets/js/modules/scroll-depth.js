import {
  prefersReducedMotion
} from '../core/device.js';

const sections = [
  ...document.querySelectorAll('[data-depth-scroll]')
];

let ticking = false;

function updateDepth(){

  const scrollY =
    window.scrollY;

  for(const section of sections){

    const depth =
      Number(section.dataset.depthScroll) || 0;

    const offset =
      scrollY * depth;

    section.style.transform =
      `translate3d(0, ${offset}px, 0)`;
  }

  ticking = false;
}

function requestUpdate(){

  if(ticking){
    return;
  }

  ticking = true;

  requestAnimationFrame(updateDepth);
}

export function initializeScrollDepth(){

  if(prefersReducedMotion()){
    return;
  }

  window.addEventListener(
    'scroll',
    requestUpdate,
    { passive:true }
  );

  requestUpdate();
} 
