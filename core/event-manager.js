// FILE: core/event-manager.js

/* =========================
   EVENT STATE
========================= */

const EVENT_STATE = {

    initialized:false,

    gyroPermissionGranted:false,

    orientationHandler:null,

    resizeHandler:null,

    visibilityHandler:null,

    touchStartHandler:null,

    touchMoveHandler:null,

    touchEndHandler:null,

    callbacks:{
        onGyroReady:null,
        onGyroDenied:null,
        onGyroUnavailable:null
    }

};

/* =========================
   GYRO SUPPORT
========================= */

function hasDeviceOrientation(){

    return (
        'DeviceOrientationEvent' in window
    );

}

/* =========================
   PERMISSION REQUEST
========================= */

async function requestGyroPermission(){

    if(!hasDeviceOrientation()){

        if(typeof EVENT_STATE.callbacks.onGyroUnavailable === 'function'){

            EVENT_STATE.callbacks.onGyroUnavailable();

        }

        return false;

    }

    const requiresPermission =
        typeof DeviceOrientationEvent.requestPermission === 'function';

    if(!requiresPermission){

        EVENT_STATE.gyroPermissionGranted = true;

        if(typeof EVENT_STATE.callbacks.onGyroReady === 'function'){

            EVENT_STATE.callbacks.onGyroReady();

        }

        return true;

    }

    try{

        const permission =
            await DeviceOrientationEvent.requestPermission();

        if(permission === 'granted'){

            EVENT_STATE.gyroPermissionGranted = true;

            if(typeof EVENT_STATE.callbacks.onGyroReady === 'function'){

                EVENT_STATE.callbacks.onGyroReady();

            }

            return true;

        }

        if(typeof EVENT_STATE.callbacks.onGyroDenied === 'function'){

            EVENT_STATE.callbacks.onGyroDenied();

        }

        return false;

    }catch(error){

        console.warn(
            '[GYRO PERMISSION ERROR]',
            error
        );

        if(typeof EVENT_STATE.callbacks.onGyroDenied === 'function'){

            EVENT_STATE.callbacks.onGyroDenied();

        }

        return false;

    }

}

/* =========================
   ORIENTATION EVENT
========================= */

function bindOrientationEvent(){

    if(EVENT_STATE.orientationHandler){
        return;
    }

    EVENT_STATE.orientationHandler = (event)=>{

        window.dispatchEvent(

            new CustomEvent(
                'native-device-rotation',
                {
                    detail:{
                        alpha:event.alpha || 0,
                        beta:event.beta || 0,
                        gamma:event.gamma || 0
                    }
                }
            )

        );

    };

    window.addEventListener(
        'deviceorientation',
        EVENT_STATE.orientationHandler,
        { passive:true }
    );

}

/* =========================
   RESIZE EVENT
========================= */

function bindResizeEvent(){

    if(EVENT_STATE.resizeHandler){
        return;
    }

    EVENT_STATE.resizeHandler = ()=>{

        window.dispatchEvent(
            new Event(
                'native-viewport-resize'
            )
        );

    };

    window.addEventListener(
        'resize',
        EVENT_STATE.resizeHandler,
        { passive:true }
    );

}

/* =========================
   VISIBILITY EVENT
========================= */

function bindVisibilityEvent(){

    if(EVENT_STATE.visibilityHandler){
        return;
    }

    EVENT_STATE.visibilityHandler = ()=>{

        window.dispatchEvent(

            new CustomEvent(
                'native-visibility-change',
                {
                    detail:{
                        hidden:document.hidden
                    }
                }
            )

        );

    };

    document.addEventListener(
        'visibilitychange',
        EVENT_STATE.visibilityHandler,
        { passive:true }
    );

}

/* =========================
   TOUCH EVENTS
========================= */

function bindTouchEvents(){

    if(EVENT_STATE.touchStartHandler){
        return;
    }

    EVENT_STATE.touchStartHandler = ()=>{

        document.body.classList.add(
            'user-touching'
        );

    };

    EVENT_STATE.touchMoveHandler = ()=>{

        document.body.classList.add(
            'user-touching'
        );

    };

    EVENT_STATE.touchEndHandler = ()=>{

        document.body.classList.remove(
            'user-touching'
        );

    };

    window.addEventListener(
        'touchstart',
        EVENT_STATE.touchStartHandler,
        { passive:true }
    );

    window.addEventListener(
        'touchmove',
        EVENT_STATE.touchMoveHandler,
        { passive:true }
    );

    window.addEventListener(
        'touchend',
        EVENT_STATE.touchEndHandler,
        { passive:true }
    );

}

/* =========================
   REMOVE EVENTS
========================= */

function removeAllEvents(){

    if(EVENT_STATE.orientationHandler){

        window.removeEventListener(
            'deviceorientation',
            EVENT_STATE.orientationHandler
        );

        EVENT_STATE.orientationHandler = null;

    }

    if(EVENT_STATE.resizeHandler){

        window.removeEventListener(
            'resize',
            EVENT_STATE.resizeHandler
        );

        EVENT_STATE.resizeHandler = null;

    }

    if(EVENT_STATE.visibilityHandler){

        document.removeEventListener(
            'visibilitychange',
            EVENT_STATE.visibilityHandler
        );

        EVENT_STATE.visibilityHandler = null;

    }

    if(EVENT_STATE.touchStartHandler){

        window.removeEventListener(
            'touchstart',
            EVENT_STATE.touchStartHandler
        );

        EVENT_STATE.touchStartHandler = null;

    }

    if(EVENT_STATE.touchMoveHandler){

        window.removeEventListener(
            'touchmove',
            EVENT_STATE.touchMoveHandler
        );

        EVENT_STATE.touchMoveHandler = null;

    }

    if(EVENT_STATE.touchEndHandler){

        window.removeEventListener(
            'touchend',
            EVENT_STATE.touchEndHandler
        );

        EVENT_STATE.touchEndHandler = null;

    }

}

/* =========================
   USER INTERACTION BOOT
========================= */

function bindInitialUserInteraction(){

    const unlockGyro = async ()=>{

        await requestGyroPermission();

        bindOrientationEvent();

        window.removeEventListener(
            'click',
            unlockGyro
        );

        window.removeEventListener(
            'touchstart',
            unlockGyro
        );

    };

    window.addEventListener(
        'click',
        unlockGyro,
        { passive:true, once:true }
    );

    window.addEventListener(
        'touchstart',
        unlockGyro,
        { passive:true, once:true }
    );

}

/* =========================
   INITIALIZE
========================= */

export function initializeEventManager(callbacks = {}){

    if(EVENT_STATE.initialized){
        return;
    }

    EVENT_STATE.initialized = true;

    EVENT_STATE.callbacks = {

        onGyroReady:callbacks.onGyroReady || null,

        onGyroDenied:callbacks.onGyroDenied || null,

        onGyroUnavailable:callbacks.onGyroUnavailable || null

    };

    bindResizeEvent();

    bindVisibilityEvent();

    bindTouchEvents();

    bindInitialUserInteraction();

}

/* =========================
   DESTROY
========================= */

export function destroyEventManager(){

    removeAllEvents();

    EVENT_STATE.initialized = false;

}

/* =========================
   CLEANUP
========================= */

window.addEventListener(
    'beforeunload',
    destroyEventManager,
    { passive:true }
); 
