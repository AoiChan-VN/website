import {
    getCache,
    setCache
}
from './cache.js';

import { CONFIG }
from './config.js';

function isFileProtocol(){

    return (
        location.protocol === 'file:'
    );
}

async function fetchJSON(path){

    const res = await fetch(path);

    if(!res.ok){

        throw new Error(
            `Failed loading ${path}`
        );
    }

    return res.json();
}

export async function loadProfile(){

    const cached =
        getCache('profile');

    if(cached) return cached;

    try{

        if(isFileProtocol()){

            const embedded =
                document.getElementById(
                    'embedded-profile'
                );

            if(embedded){

                return JSON.parse(
                    embedded.textContent
                );
            }
        }

        const json =
            await fetchJSON(
                `${CONFIG.DATA_DIR}profile.json`
            );

        return setCache(
            'profile',
            json
        );

    }catch(err){

        console.error(err);

        return {
            items:[]
        };
    }
}

export async function loadItem(id){

    const cached =
        getCache(id);

    if(cached) return cached;

    try{

        const json =
            await fetchJSON(
                `${CONFIG.DATA_DIR}${id}.json`
            );

        return setCache(id,json);

    }catch(err){

        console.error(err);

        return null;
    }
}
