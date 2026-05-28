import { rafThrottle } from '../utils/raf.js';

const layers = [
  ...document.querySelectorAll('.parallax-layer')
];

let pointerX = 0;
let pointerY = 0;

function updateLayers(){

  for(const layer of layers){

    const depth =
      Number(layer.dataset.depth) || 0;

    const moveX = pointerX * depth;
    const moveY = pointerY * depth;

    layer.style.transform =
      `translate3d(${moveX}px, ${moveY}px, 0)`;
  }
}

const handlePointerMove = rafThrottle((event) => {

  const centerX = window.innerWidth * 0.5;
  const centerY = window.innerHeight * 0.5;

  pointerX =
    (event.clientX - centerX) * 0.08;

  pointerY =
    (event.clientY - centerY) * 0.08;

  updateLayers();
});

export function initializeParallax(){

  window.addEventListener(
    'pointermove',
    handlePointerMove,
    { passive:true }
  );
} 
