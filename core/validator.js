export function validateProduct(item) {

  return (

    typeof item.id !== 'undefined' &&
    typeof item.name === 'string' &&
    typeof item.img === 'string'

  );

} 
