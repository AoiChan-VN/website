const memory = new Map();

export function getCache(key){

    return memory.get(key);
}

export function setCache(key,value){

    memory.set(key,value);

    return value;
} 
