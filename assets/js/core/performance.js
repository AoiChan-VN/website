export function initializePerformance(){

  document.documentElement.style.setProperty(
    '--device-pixel-ratio',
    window.devicePixelRatio.toString()
  );
} 
