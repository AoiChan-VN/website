export function addPassiveEvent(
  target,
  event,
  callback
){

  target.addEventListener(
    event,
    callback,
    { passive:true }
  );
} 
