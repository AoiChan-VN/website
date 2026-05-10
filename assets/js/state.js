const state = {

    profile: null,

    items: [],

    filtered: [],

    activeItem: null,

    query: ''
};

export function getState(){

    return state;
}

export function setState(key,value){

    state[key] = value;

    return state;
} 
