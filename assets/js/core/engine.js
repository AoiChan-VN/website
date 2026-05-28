import { initializeParallax } from '../modules/parallax.js';
import { initializeViewport } from '../modules/viewport.js';
import { initializePerformance } from './performance.js';

let initialized = false;

export function initializeEngine(){

  if(initialized){
    return;
  }

  initialized = true;

  initializeViewport();

  initializePerformance();

  initializeParallax();
}
