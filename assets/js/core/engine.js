import { initializeParallax } from '../modules/parallax.js';
import { initializeViewport } from '../modules/viewport.js';
import { initializePerformance } from './performance.js';

export function initializeEngine(){

  initializeViewport();

  initializePerformance();

  initializeParallax();
} 
