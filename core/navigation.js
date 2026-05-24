const STACK = [];

export function pushState(state) {
  STACK.push(state);
}

export function popState() {
  return STACK.pop();
}

export function getStack() {
  return STACK;
} 
