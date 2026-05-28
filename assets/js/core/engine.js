import { initializeParallax } from '../modules/parallax.js';
import { initializeViewport } from '../modules/viewport.js';
import { initializeParticles } from '../modules/particles.js';
import { initializeCursor } from '../modules/cursor.js';
import { initializeReveal } from '../modules/reveal.js';
import { initializeScrollDepth } from '../modules/scroll-depth.js';
import { initializeLoading } from '../modules/loading.js';
import { initializeMobileMenu } from '../modules/mobile-menu.js';
import { initializeLazyMedia } from '../modules/lazy-media.js';

import { initializePerformance } from './performance.js';
import { initializeFpsManager } from './fps.js';

let initialized = false;

export function initializeEngine(){

  if(initialized){
    return;
  }

  initialized = true;

  initializeViewport();

  initializePerformance();

  initializeFpsManager();

  initializeLoading();

  initializeMobileMenu();

  initializeLazyMedia();

  initializeParallax();

  initializeParticles();

  initializeCursor();

  initializeReveal();

  initializeScrollDepth();
}
