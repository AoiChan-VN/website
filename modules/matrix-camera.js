// FILE: modules/matrix-camera.js

import {
    initializeOrientationParser,
    subscribeOrientation,
    unsubscribeOrientation
} from './orientation-parser.js';

import {
    initializeOpacityBlender,
    updateOpacityBlend,
    resetOpacityBlender
} from './opacity-blender.js';

/* =========================
   MATRIX CAMERA STATE
========================= */

const MATRIX_CAMERA_STATE = {

    initialized:false,

    active:false,

    latestRotation:{
        alpha:0,
        beta:0,
        gamma:0
    },

    transformIntensity:12,

    matrixLayer:null,

    overlay:null,

    orientationCallback:null

};

/* =========================
   DOM CACHE
========================= */

function cacheDOM(){

    MATRIX_CAMERA_STATE.matrixLayer =
        document.getElementById(
            'matrix-layer'
        );

    MATRIX_CAMERA_STATE.overlay =
        document.getElementById(
            'portal-overlay'
        );

}

/* =========================
   CLAMP
========================= */

function clamp(value, min, max){

    if(value < min){
        return min;
    }

    if(value > max){
        return max;
    }

    return value;

}

/* =========================
   APPLY PARALLAX
========================= */

function applyParallax(rotation){

    if(!MATRIX_CAMERA_STATE.matrixLayer){
        return;
    }

    const offsetX =
        clamp(
            rotation.gamma,
            -45,
            45
        ) * 0.22;

    const offsetY =
        clamp(
            rotation.beta,
            -45,
            45
        ) * 0.18;

    MATRIX_CAMERA_STATE.matrixLayer.style.transform = `
        translate3d(
            ${offsetX}px,
            ${offsetY}px,
            0
        )
        scale(1.04)
    `;

}

/* =========================
   OVERLAY DEPTH
========================= */

function applyOverlayDepth(rotation){

    if(!MATRIX_CAMERA_STATE.overlay){
        return;
    }

    const intensity =
        Math.abs(rotation.beta) +
        Math.abs(rotation.gamma);

    const opacity =
        clamp(
            0.18 + (intensity / 180),
            0.18,
            0.4
        );

    MATRIX_CAMERA_STATE.overlay.style.opacity =
        opacity.toFixed(3);

}

/* =========================
   ORIENTATION UPDATE
========================= */

function handleOrientationUpdate(rotation){

    MATRIX_CAMERA_STATE.latestRotation =
        rotation;

    applyParallax(rotation);

    applyOverlayDepth(rotation);

    updateOpacityBlend(rotation);

}

/* =========================
   INITIALIZE
========================= */

export function initializeMatrixCamera(){

    if(MATRIX_CAMERA_STATE.initialized){
        return;
    }

    MATRIX_CAMERA_STATE.initialized = true;

    cacheDOM();

    initializeOrientationParser();

    initializeOpacityBlender();

    MATRIX_CAMERA_STATE.orientationCallback =
        handleOrientationUpdate;

    subscribeOrientation(
        MATRIX_CAMERA_STATE.orientationCallback
    );

    MATRIX_CAMERA_STATE.active = true;

    console.info(
        '[MATRIX CAMERA READY]'
    );

}

/* =========================
   PAUSE
========================= */

export function pauseMatrixCamera(){

    MATRIX_CAMERA_STATE.active = false;

}

/* =========================
   RESUME
========================= */

export function resumeMatrixCamera(){

    MATRIX_CAMERA_STATE.active = true;

}

/* =========================
   RESET
========================= */

export function resetMatrixCamera(){

    resetOpacityBlender();

    if(MATRIX_CAMERA_STATE.matrixLayer){

        MATRIX_CAMERA_STATE.matrixLayer.style.transform =
            'translate3d(0,0,0) scale(1)';

    }

    if(MATRIX_CAMERA_STATE.overlay){

        MATRIX_CAMERA_STATE.overlay.style.opacity =
            '1';

    }

}

/* =========================
   DESTROY
========================= */

export function destroyMatrixCamera(){

    if(
        MATRIX_CAMERA_STATE.orientationCallback
    ){

        unsubscribeOrientation(
            MATRIX_CAMERA_STATE.orientationCallback
        );

    }

    MATRIX_CAMERA_STATE.active = false;

    MATRIX_CAMERA_STATE.initialized = false;

}

/* =========================
   GET STATE
========================= */

export function getMatrixCameraState(){

    return {

        initialized:
            MATRIX_CAMERA_STATE.initialized,

        active:
            MATRIX_CAMERA_STATE.active,

        rotation:
            MATRIX_CAMERA_STATE.latestRotation

    };

}

/* =========================
   CLEANUP
========================= */

window.addEventListener(
    'beforeunload',
    destroyMatrixCamera,
    { passive:true }
); 
