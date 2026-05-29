// FILE: core/gyro-matrix.js

import {
    initializeMatrixCamera,
    pauseMatrixCamera,
    resumeMatrixCamera,
    resetMatrixCamera
} from '../modules/matrix-camera.js';

/* =========================
   GYRO MATRIX STATE
========================= */

const GYRO_MATRIX_STATE = {

    initialized:false,

    active:false,

    sleeping:false,

    lowPowerMode:false,

    orientationSupported:false,

    lastInteractionTime:0,

    sleepDelay:12000,

    wakeThreshold:0.8

};

/* =========================
   SUPPORT CHECK
========================= */

function detectOrientationSupport(){

    GYRO_MATRIX_STATE.orientationSupported =
        'DeviceOrientationEvent' in window;

    return GYRO_MATRIX_STATE.orientationSupported;

}

/* =========================
   LOW POWER DETECTION
========================= */

function detectLowPowerMode(){

    const memory =
        navigator.deviceMemory || 4;

    const cores =
        navigator.hardwareConcurrency || 4;

    GYRO_MATRIX_STATE.lowPowerMode =
        memory <= 4 || cores <= 4;

    if(GYRO_MATRIX_STATE.lowPowerMode){

        document.body.classList.add(
            'low-performance-mode'
        );

    }

}

/* =========================
   SLEEP SYSTEM
========================= */

function sleepMatrix(){

    if(GYRO_MATRIX_STATE.sleeping){
        return;
    }

    GYRO_MATRIX_STATE.sleeping = true;

    pauseMatrixCamera();

    document.body.classList.add(
        'matrix-sleeping'
    );

}

/* =========================
   WAKE SYSTEM
========================= */

function wakeMatrix(){

    if(!GYRO_MATRIX_STATE.sleeping){
        return;
    }

    GYRO_MATRIX_STATE.sleeping = false;

    resumeMatrixCamera();

    document.body.classList.remove(
        'matrix-sleeping'
    );

}

/* =========================
   ACTIVITY TRACKER
========================= */

function updateActivity(){

    GYRO_MATRIX_STATE.lastInteractionTime =
        performance.now();

    wakeMatrix();

}

/* =========================
   AUTO SLEEP LOOP
========================= */

function monitorSleepState(){

    const now =
        performance.now();

    const inactiveTime =
        now -
        GYRO_MATRIX_STATE.lastInteractionTime;

    if(
        inactiveTime >=
        GYRO_MATRIX_STATE.sleepDelay
    ){

        sleepMatrix();

    }

    window.requestAnimationFrame(
        monitorSleepState
    );

}

/* =========================
   DEVICE ROTATION
========================= */

function handleRotation(event){

    const detail =
        event.detail;

    const beta =
        Math.abs(detail.beta || 0);

    const gamma =
        Math.abs(detail.gamma || 0);

    if(
        beta > GYRO_MATRIX_STATE.wakeThreshold ||
        gamma > GYRO_MATRIX_STATE.wakeThreshold
    ){

        updateActivity();

    }

}

/* =========================
   VISIBILITY
========================= */

function handleVisibility(event){

    const hidden =
        event.detail.hidden;

    if(hidden){

        sleepMatrix();
        return;

    }

    wakeMatrix();

}

/* =========================
   VIEWPORT RESET
========================= */

function handleViewportResize(){

    resetMatrixCamera();

}

/* =========================
   EVENT BINDING
========================= */

function bindEvents(){

    window.addEventListener(
        'native-device-rotation',
        handleRotation,
        { passive:true }
    );

    window.addEventListener(
        'native-visibility-change',
        handleVisibility,
        { passive:true }
    );

    window.addEventListener(
        'native-viewport-resize',
        handleViewportResize,
        { passive:true }
    );

    window.addEventListener(
        'touchstart',
        updateActivity,
        { passive:true }
    );

    window.addEventListener(
        'mousemove',
        updateActivity,
        { passive:true }
    );

}

/* =========================
   REMOVE EVENTS
========================= */

function removeEvents(){

    window.removeEventListener(
        'native-device-rotation',
        handleRotation
    );

    window.removeEventListener(
        'native-visibility-change',
        handleVisibility
    );

    window.removeEventListener(
        'native-viewport-resize',
        handleViewportResize
    );

    window.removeEventListener(
        'touchstart',
        updateActivity
    );

    window.removeEventListener(
        'mousemove',
        updateActivity
    );

}

/* =========================
   INITIALIZE
========================= */

export function initializeGyroMatrix(){

    if(GYRO_MATRIX_STATE.initialized){
        return;
    }

    GYRO_MATRIX_STATE.initialized = true;

    detectOrientationSupport();

    detectLowPowerMode();

    initializeMatrixCamera();

    bindEvents();

    updateActivity();

    monitorSleepState();

    GYRO_MATRIX_STATE.active = true;

    console.info(
        '[GYRO MATRIX ACTIVE]'
    );

}

/* =========================
   DESTROY
========================= */

export function destroyGyroMatrix(){

    removeEvents();

    resetMatrixCamera();

    GYRO_MATRIX_STATE.active = false;

    GYRO_MATRIX_STATE.initialized = false;

}

/* =========================
   GET STATE
========================= */

export function getGyroMatrixState(){

    return {

        initialized:
            GYRO_MATRIX_STATE.initialized,

        active:
            GYRO_MATRIX_STATE.active,

        sleeping:
            GYRO_MATRIX_STATE.sleeping,

        lowPowerMode:
            GYRO_MATRIX_STATE.lowPowerMode,

        orientationSupported:
            GYRO_MATRIX_STATE.orientationSupported

    };

}

/* =========================
   CLEANUP
========================= */

window.addEventListener(
    'beforeunload',
    destroyGyroMatrix,
    { passive:true }
); 
