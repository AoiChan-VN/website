import {
  isTouchDevice,
  prefersReducedMotion
} from '../core/device.js';

const PARTICLE_COUNT = 32;

let animationId = 0;

const particles = [];

function random(min,max){

  return (
    Math.random() * (max - min)
  ) + min;
}

function createParticle(container){

  const element =
    document.createElement('div');

  element.className = 'particle';

  const particle = {
    element,
    x:random(0,window.innerWidth),
    y:random(0,window.innerHeight),
    speedX:random(-0.12,0.12),
    speedY:random(-0.16,0.16),
    scale:random(0.8,1.8)
  };

  element.style.opacity =
    String(random(0.3,0.8));

  element.style.transform =
    `translate3d(${particle.x}px, ${particle.y}px, 0)
     scale(${particle.scale})`;

  container.appendChild(element);

  particles.push(particle);
}

function updateParticles(){

  for(const particle of particles){

    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if(particle.x < -40){
      particle.x = window.innerWidth + 40;
    }

    if(particle.x > window.innerWidth + 40){
      particle.x = -40;
    }

    if(particle.y < -40){
      particle.y = window.innerHeight + 40;
    }

    if(particle.y > window.innerHeight + 40){
      particle.y = -40;
    }

    particle.element.style.transform =
      `translate3d(${particle.x}px, ${particle.y}px, 0)
       scale(${particle.scale})`;
  }

  animationId =
    requestAnimationFrame(updateParticles);
}

export function initializeParticles(){

  if(
    isTouchDevice() ||
    prefersReducedMotion()
  ){
    return;
  }

  const container =
    document.querySelector('.particle-field');

  if(!container){
    return;
  }

  for(let i = 0; i < PARTICLE_COUNT; i += 1){
    createParticle(container);
  }

  updateParticles();

  window.addEventListener(
    'visibilitychange',
    () => {

      if(document.hidden){

        cancelAnimationFrame(animationId);

        return;
      }

      updateParticles();
    },
    { passive:true }
  );
}
