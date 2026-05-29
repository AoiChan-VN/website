// FILE: core/render-loop.js

/* =========================
   RENDER LOOP STATE
========================= */

const RENDER_STATE = {

    running:false,

    animationFrameId:0,

    previousTime:0,

    deltaTime:0,

    elapsedTime:0,

    maxDelta:32,

    callbacks:[]

};

/* =========================
   INTERNAL LOOP
========================= */

function renderFrame(currentTime){

    if(!RENDER_STATE.running){
        return;
    }

    if(RENDER_STATE.previousTime === 0){

        RENDER_STATE.previousTime = currentTime;

    }

    RENDER_STATE.deltaTime =
        currentTime - RENDER_STATE.previousTime;

    if(RENDER_STATE.deltaTime > RENDER_STATE.maxDelta){

        RENDER_STATE.deltaTime =
            RENDER_STATE.maxDelta;

    }

    RENDER_STATE.previousTime =
        currentTime;

    RENDER_STATE.elapsedTime +=
        RENDER_STATE.deltaTime;

    const callbackCount =
        RENDER_STATE.callbacks.length;

    for(let i = 0; i < callbackCount; i++){

        const callback =
            RENDER_STATE.callbacks[i];

        if(typeof callback !== 'function'){
            continue;
        }

        callback({
            currentTime,
            deltaTime:RENDER_STATE.deltaTime,
            elapsedTime:RENDER_STATE.elapsedTime
        });

    }

    RENDER_STATE.animationFrameId =
        window.requestAnimationFrame(
            renderFrame
        );

}

/* =========================
   START LOOP
========================= */

export function startRenderLoop(options = {}){

    if(RENDER_STATE.running){
        return;
    }

    RENDER_STATE.running = true;

    if(typeof options.onFrame === 'function'){

        addRenderCallback(
            options.onFrame
        );

    }

    RENDER_STATE.animationFrameId =
        window.requestAnimationFrame(
            renderFrame
        );

}

/* =========================
   STOP LOOP
========================= */

export function stopRenderLoop(){

    if(!RENDER_STATE.running){
        return;
    }

    RENDER_STATE.running = false;

    window.cancelAnimationFrame(
        RENDER_STATE.animationFrameId
    );

    RENDER_STATE.animationFrameId = 0;

    RENDER_STATE.previousTime = 0;

}

/* =========================
   ADD CALLBACK
========================= */

export function addRenderCallback(callback){

    if(typeof callback !== 'function'){
        return;
    }

    const exists =
        RENDER_STATE.callbacks.includes(
            callback
        );

    if(exists){
        return;
    }

    RENDER_STATE.callbacks.push(
        callback
    );

}

/* =========================
   REMOVE CALLBACK
========================= */

export function removeRenderCallback(callback){

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
   LOOP STATUS
========================= */

export function isRenderLoopRunning(){

    return RENDER_STATE.running;

}

/* =========================
   GET DELTA
========================= */

export function getDeltaTime(){

    return RENDER_STATE.deltaTime;

}

/* =========================
   GET ELAPSED
========================= */

export function getElapsedTime(){

    return RENDER_STATE.elapsedTime;

}

/* =========================
   VISIBILITY CONTROL
========================= */

function handleVisibilityChange(){

    if(document.hidden){

        stopRenderLoop();

        return;

    }

    startRenderLoop();

}

document.addEventListener(
    'visibilitychange',
    handleVisibilityChange,
    { passive:true }
);

/* =========================
   PAGE UNLOAD CLEANUP
========================= */

window.addEventListener(
    'beforeunload',
    ()=>{

        stopRenderLoop();

        RENDER_STATE.callbacks.length = 0;

    },
    { passive:true }
); 
