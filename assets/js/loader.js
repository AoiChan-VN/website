import { CONFIG } from './config.js';
import { getCache,setCache } from './cache.js';

export async function loadProfile(){

    const cache = getCache('profile');

    if(cache) return cache;

    const res = await fetch(
        `${CONFIG.DATA_DIR}profile.json`
    );

    const json = await res.json();

    return setCache('profile',json);
}

export async function loadItem(id){

    const cache = getCache(id);

    if(cache) return cache;

    const res = await fetch(
        `${CONFIG.DATA_DIR}${id}.json`
    );

    const json = await res.json();

    return setCache(id,json);
} 
