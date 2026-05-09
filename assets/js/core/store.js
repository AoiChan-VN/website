const state = {

    site: null,
    projects: [],
    route: '/'

}

export function getState() {

    return structuredClone(state)

}

export function updateState(payload) {

    Object.assign(state, payload)

} 
