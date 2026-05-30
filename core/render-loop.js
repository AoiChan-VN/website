// FILE: core/render-loop.js

/* =========================
   RENDER STATE
========================= */

const RENDER_STATE = {

    running:false,

    paused:false,

    animationFrameId:0,

    previousTime:0,

    deltaTime:0,

    elapsedTime:0,

    maxDelta:32,

    callbacks:[]

};

/* =========================
   FRAME
========================= */

function renderFrame(currentTime){

    if(
        !RENDER_STATE.running ||
        RENDER_STATE.paused
    ){
        return;
    }

    if(
        RENDER_STATE.previousTime === 0
    ){

        RENDER_STATE.previousTime =
            currentTime;

    }

    RENDER_STATE.deltaTime =
        currentTime -
        RENDER_STATE.previousTime;

    if(
        RENDER_STATE.deltaTime >
        RENDER_STATE.maxDelta
    ){

        RENDER_STATE.deltaTime =
            RENDER_STATE.maxDelta;

    }

    RENDER_STATE.previousTime =
        currentTime;

    RENDER_STATE.elapsedTime +=
        RENDER_STATE.deltaTime;

    const count =
        RENDER_STATE.callbacks.length;

    for(
        let i = 0;
        i < count;
        i++
    ){

        const callback =
            RENDER_STATE.callbacks[i];

        if(
            typeof callback !==
            'function'
        ){
            continue;
        }

        callback({

            currentTime,

            deltaTime:
                RENDER_STATE.deltaTime,

            elapsedTime:
                RENDER_STATE.elapsedTime

        });

    }

    RENDER_STATE.animationFrameId =
        window.requestAnimationFrame(
            renderFrame
        );

}

/* =========================
   START
========================= */

export function startRenderLoop(
    options = {}
){

    if(
        typeof options.onFrame ===
        'function'
    ){

        addRenderCallback(
            options.onFrame
        );

    }

    if(
        RENDER_STATE.running
    ){
        return;
    }

    RENDER_STATE.running = true;

    RENDER_STATE.paused = false;

    RENDER_STATE.animationFrameId =
        window.requestAnimationFrame(
            renderFrame
        );

}

/* =========================
   STOP
========================= */

export function stopRenderLoop(){

    if(
        !RENDER_STATE.running
    ){
        return;
    }

    if(
        RENDER_STATE.animationFrameId
    ){

        window.cancelAnimationFrame(
            RENDER_STATE.animationFrameId
        );

    }

    RENDER_STATE.animationFrameId = 0;

    RENDER_STATE.running = false;

    RENDER_STATE.paused = false;

    RENDER_STATE.previousTime = 0;

}

/* =========================
   PAUSE
========================= */

export function pauseRenderLoop(){

    if(
        !RENDER_STATE.running ||
        RENDER_STATE.paused
    ){
        return;
    }

    RENDER_STATE.paused = true;

    if(
        RENDER_STATE.animationFrameId
    ){

        window.cancelAnimationFrame(
            RENDER_STATE.animationFrameId
        );

    }

    RENDER_STATE.animationFrameId = 0;

}

/* =========================
   RESUME
========================= */

export function resumeRenderLoop(){

    if(
        !RENDER_STATE.running ||
        !RENDER_STATE.paused
    ){
        return;
    }

    RENDER_STATE.paused = false;

    RENDER_STATE.previousTime = 0;

    RENDER_STATE.animationFrameId =
        window.requestAnimationFrame(
            renderFrame
        );

}

/* =========================
   CALLBACKS
========================= */

export function addRenderCallback(
    callback
){

    if(
        typeof callback !==
        'function'
    ){
        return;
    }

    if(
        RENDER_STATE.callbacks.includes(
            callback
        )
    ){
        return;
    }

    RENDER_STATE.callbacks.push(
        callback
    );

}

export function removeRenderCallback(
    callback
){

    const index =
        RENDER_STATE.callbacks.indexOf(
            callback
        );

    if(index === -1){
        return;
    }

    RENDER_STATE.callbacks.splice(
        index,
        1
    );

}

/* =========================
   GETTERS
========================= */

export function getDeltaTime(){

    return RENDER_STATE.deltaTime;

}

export function getElapsedTime(){

    return RENDER_STATE.elapsedTime;

}

export function isRenderLoopRunning(){

    return (
        RENDER_STATE.running &&
        !RENDER_STATE.paused
    );

}

/* =========================
   VISIBILITY
========================= */

function handleVisibilityChange(){

    if(
        document.hidden
    ){

        pauseRenderLoop();

        return;

    }

    resumeRenderLoop();

}

document.addEventListener(
    'visibilitychange',
    handleVisibilityChange,
    { passive:true }
);

/* =========================
   CLEANUP
========================= */

function destroyRenderLoop(){

    stopRenderLoop();

    RENDER_STATE.callbacks.length = 0;

}

window.addEventListener(
    'beforeunload',
    destroyRenderLoop,
    { passive:true }
); 
