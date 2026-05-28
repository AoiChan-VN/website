import {
  isTouchDevice,
  prefersReducedMotion
} from './device.js';

export function initializePerformance(){

  const root = document.documentElement;

  root.style.setProperty(
    '--device-pixel-ratio',
    String(window.devicePixelRatio || 1)
  );

  if(isTouchDevice()){
    root.classList.add('is-touch-device');
  }

  if(prefersReducedMotion()){
    root.classList.add('reduced-motion');
  }
}
