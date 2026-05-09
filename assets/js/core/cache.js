const memory = new Map()

export function setCache(key, value) {

    memory.set(key, value)

}

export function getCache(key) {

    return memory.get(key)

}

export function hasCache(key) {

    return memory.has(key)

} 
