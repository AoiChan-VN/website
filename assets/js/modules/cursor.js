import {
  isTouchDevice,
  prefersReducedMotion
} from '../core/device.js';

let rafId = 0;

let currentX = 0;
let currentY = 0;

let targetX = 0;
let targetY = 0;

function render(orb){

  currentX +=
    (targetX - currentX) * 0.14;

  currentY +=
    (targetY - currentY) * 0.14;

  orb.style.transform =
    `translate3d(${currentX}px, ${currentY}px, 0)`;

  rafId =
    requestAnimationFrame(() => render(orb));
}

export function initializeCursor(){

  if(
    isTouchDevice() ||
    prefersReducedMotion()
  ){
    return;
  }

  const orb =
    document.querySelector('.cursor-orb');

  if(!orb){
    return;
  }

  window.addEventListener(
    'pointermove',
    (event) => {

      targetX = event.clientX;
      targetY = event.clientY;
    },
    { passive:true }
  );

  render(orb);

  window.addEventListener(
    'visibilitychange',
    () => {

      if(document.hidden){

        cancelAnimationFrame(rafId);

        return;
      }

      render(orb);
    },
    { passive:true }
  );
} 
