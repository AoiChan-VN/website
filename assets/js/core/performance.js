/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

export function measurePerformance(
  label,
  callback
) {

  const start =
    performance.now();

  callback();

  const end =
    performance.now();

  console.info(
    `[Performance] ${label}: ${
      (end - start).toFixed(2)
    }ms`
  );

} 
