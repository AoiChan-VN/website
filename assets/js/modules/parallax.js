import {
  isTouchDevice,
  prefersReducedMotion
} from '../core/device.js';

const layers = [
  ...document.querySelectorAll('.parallax-layer')
];

let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;

let currentX = 0;
let currentY = 0;

let rafId = 0;

function updateViewport(){

  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
}

function render(){

  for(const layer of layers){

    const depth =
      Number(layer.dataset.depth) || 0;

    const moveX = currentX * depth;
    const moveY = currentY * depth;

    layer.style.transform =
      `translate3d(${moveX}px, ${moveY}px, 0)`;
  }

  rafId = 0;
}

function queueRender(){

  if(rafId){
    return;
  }

  rafId = requestAnimationFrame(render);
}

function handlePointerMove(event){

  const centerX = viewportWidth * 0.5;
  const centerY = viewportHeight * 0.5;

  currentX =
    (event.clientX - centerX) * 0.045;

  currentY =
    (event.clientY - centerY) * 0.045;

  queueRender();
}

export function initializeParallax(){

  if(
    isTouchDevice() ||
    prefersReducedMotion()
  ){
    return;
  }

  updateViewport();

  window.addEventListener(
    'resize',
    updateViewport,
    { passive:true }
  );

  window.addEventListener(
    'pointermove',
    handlePointerMove,
    { passive:true }
  );
}
