// FILE: modules/orientation-parser.js

/* =========================
   ORIENTATION STATE
========================= */

const ORIENTATION_STATE = {

    initialized:false,

    animationFrameId:0,

    current:{
        alpha:0,
        beta:0,
        gamma:0
    },

    target:{
        alpha:0,
        beta:0,
        gamma:0
    },

    smoothed:{
        alpha:0,
        beta:0,
        gamma:0
    },

    lerpFactor:0.08,

    maxBeta:45,
    maxGamma:45,

    listeners:new Set(),

    updateBound:null

};

/* =========================
   CLAMP
========================= */

function clamp(value,min,max){

    if(value < min){
        return min;
    }

    if(value > max){
        return max;
    }

    return value;

}

/* =========================
   LERP
========================= */

function lerp(start,end,factor){

    return start + (
        (end - start) * factor
    );

}

/* =========================
   NORMALIZE
========================= */

function normalizeToUnit(value,limit){

    return (
        value + limit
    ) / (
        limit * 2
    );

}

/* =========================
   LIMIT ROTATION
========================= */

function normalizeOrientation(){

    ORIENTATION_STATE.target.beta =
        clamp(
            ORIENTATION_STATE.target.beta,
            -ORIENTATION_STATE.maxBeta,
            ORIENTATION_STATE.maxBeta
        );

    ORIENTATION_STATE.target.gamma =
        clamp(
            ORIENTATION_STATE.target.gamma,
            -ORIENTATION_STATE.maxGamma,
            ORIENTATION_STATE.maxGamma
        );

}

/* =========================
   SMOOTHING
========================= */

function smoothOrientation(){

    ORIENTATION_STATE.smoothed.alpha =
        lerp(
            ORIENTATION_STATE.smoothed.alpha,
            ORIENTATION_STATE.target.alpha,
            ORIENTATION_STATE.lerpFactor
        );

    ORIENTATION_STATE.smoothed.beta =
        lerp(
            ORIENTATION_STATE.smoothed.beta,
            ORIENTATION_STATE.target.beta,
            ORIENTATION_STATE.lerpFactor
        );

    ORIENTATION_STATE.smoothed.gamma =
        lerp(
            ORIENTATION_STATE.smoothed.gamma,
            ORIENTATION_STATE.target.gamma,
            ORIENTATION_STATE.lerpFactor
        );

}

/* =========================
   NOTIFY
========================= */

function notifyListeners(){

    const payload = {

        alpha:
            ORIENTATION_STATE.smoothed.alpha,

        beta:
            ORIENTATION_STATE.smoothed.beta,

        gamma:
            ORIENTATION_STATE.smoothed.gamma,

        normalizedBeta:
            normalizeToUnit(
                ORIENTATION_STATE.smoothed.beta,
                ORIENTATION_STATE.maxBeta
            ),

        normalizedGamma:
            normalizeToUnit(
                ORIENTATION_STATE.smoothed.gamma,
                ORIENTATION_STATE.maxGamma
            )

    };

    ORIENTATION_STATE.listeners.forEach(
        (callback)=>{

            callback(payload);

        }
    );

}

/* =========================
   DEVICE EVENT
========================= */

function handleOrientation(event){

    ORIENTATION_STATE.target.alpha =
        event.detail.alpha || 0;

    ORIENTATION_STATE.target.beta =
        event.detail.beta || 0;

    ORIENTATION_STATE.target.gamma =
        event.detail.gamma || 0;

    normalizeOrientation();

}

/* =========================
   UPDATE LOOP
========================= */

function updateLoop(){

    if(
        !ORIENTATION_STATE.initialized
    ){
        return;
    }

    smoothOrientation();

    notifyListeners();

    ORIENTATION_STATE.animationFrameId =
        window.requestAnimationFrame(
            ORIENTATION_STATE.updateBound
        );

}

/* =========================
   INITIALIZE
========================= */

export function initializeOrientationParser(){

    if(
        ORIENTATION_STATE.initialized
    ){
        return;
    }

    ORIENTATION_STATE.initialized =
        true;

    ORIENTATION_STATE.updateBound =
        updateLoop;

    window.addEventListener(
        'native-device-rotation',
        handleOrientation,
        { passive:true }
    );

    ORIENTATION_STATE.animationFrameId =
        window.requestAnimationFrame(
            ORIENTATION_STATE.updateBound
        );

}

/* =========================
   DESTROY
========================= */

export function destroyOrientationParser(){

    if(
        !ORIENTATION_STATE.initialized
    ){
        return;
    }

    window.removeEventListener(
        'native-device-rotation',
        handleOrientation
    );

    if(
        ORIENTATION_STATE.animationFrameId
    ){

        window.cancelAnimationFrame(
            ORIENTATION_STATE.animationFrameId
        );

        ORIENTATION_STATE.animationFrameId = 0;

    }

    ORIENTATION_STATE.listeners.clear();

    ORIENTATION_STATE.updateBound = null;

    ORIENTATION_STATE.initialized =
        false;

}

/* =========================
   SUBSCRIBE
========================= */

export function subscribeOrientation(
    callback
){

    if(
        typeof callback !== 'function'
    ){
        return;
    }

    ORIENTATION_STATE.listeners.add(
        callback
    );

}

/* =========================
   UNSUBSCRIBE
========================= */

export function unsubscribeOrientation(
    callback
){

    ORIENTATION_STATE.listeners.delete(
        callback
    );

}

/* =========================
   GET STATE
========================= */

export function getOrientation(){

    return {

        alpha:
            ORIENTATION_STATE.smoothed.alpha,

        beta:
            ORIENTATION_STATE.smoothed.beta,

        gamma:
            ORIENTATION_STATE.smoothed.gamma

    };

}

/* =========================
   CONFIG
========================= */

export function configureOrientationParser(
    config = {}
){

    if(
        typeof config.lerpFactor ===
        'number'
    ){

        ORIENTATION_STATE.lerpFactor =
            clamp(
                config.lerpFactor,
                0.01,
                1
            );

    }

    if(
        typeof config.maxBeta ===
        'number'
    ){

        ORIENTATION_STATE.maxBeta =
            Math.abs(
                config.maxBeta
            );

    }

    if(
        typeof config.maxGamma ===
        'number'
    ){

        ORIENTATION_STATE.maxGamma =
            Math.abs(
                config.maxGamma
            );

    }

}

/* =========================
   CLEANUP
========================= */

window.addEventListener(
    'beforeunload',
    destroyOrientationParser,
    { passive:true }
); 
