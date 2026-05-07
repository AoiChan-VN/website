/**
 * Project: AoiChan Portfolio
 * Author: AoiChan
 * License: MIT
 */

export function validateSchema(
  data,
  requiredFields = []
) {

  return requiredFields.every(
    field =>
      Object.hasOwn(data, field)
  );

} 
