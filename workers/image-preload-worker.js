// FILE: workers/image-preload-worker.js

/* =========================
   IMAGE PRELOAD WORKER
========================= */

const WORKER_STATE = {

    initialized:false,

    loaded:0,

    failed:0,

    total:0

};

/* =========================
   IMAGE FETCH
========================= */

async function preloadImage(url){

    try{

        const response =
            await fetch(
                url,
                {
                    cache:'force-cache'
                }
            );

        if(
            !response.ok
        ){

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        const blob =
            await response.blob();

        WORKER_STATE.loaded++;

        return {
            success:true,
            url,
            size:blob.size
        };

    }catch(error){

        WORKER_STATE.failed++;

        return {
            success:false,
            url,
            error:error.message
        };

    }

}

/* =========================
   PRELOAD LIST
========================= */

async function preloadImages(list){

    WORKER_STATE.total =
        list.length;

    WORKER_STATE.loaded = 0;

    WORKER_STATE.failed = 0;

    const results = [];

    for(
        let i = 0;
        i < list.length;
        i++
    ){

        const result =
            await preloadImage(
                list[i]
            );

        results.push(
            result
        );

        self.postMessage({

            type:'progress',

            loaded:
                WORKER_STATE.loaded,

            failed:
                WORKER_STATE.failed,

            total:
                WORKER_STATE.total

        });

    }

    self.postMessage({

        type:'complete',

        loaded:
            WORKER_STATE.loaded,

        failed:
            WORKER_STATE.failed,

        total:
            WORKER_STATE.total,

        results

    });

}

/* =========================
   MESSAGE HANDLER
========================= */

self.addEventListener(
    'message',
    async (event)=>{

        const data =
            event.data;

        if(
            !data ||
            !data.type
        ){
            return;
        }

        switch(
            data.type
        ){

            case 'preload':

                await preloadImages(
                    data.images || []
                );

                break;

            default:

                self.postMessage({

                    type:'error',

                    message:
                        'UNKNOWN_WORKER_COMMAND'

                });

        }

    }
);

/* =========================
   BOOT
========================= */

WORKER_STATE.initialized = true;

self.postMessage({

    type:'ready'

});
