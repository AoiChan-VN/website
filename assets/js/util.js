export async function idle(){

    return new Promise(resolve=>{

        requestIdleCallback(resolve);
    });
}

export function ext(path=''){

    return path
        .split('.')
        .pop()
        .toLowerCase();
} 
