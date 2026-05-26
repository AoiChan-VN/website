export function validateData(data) {

  if (!Array.isArray(data)) {

    throw new Error(
      "[INVALID-DATA]"
    );

  }

} 
