// FILE: core/mobile-optimizer.js

/* =========================
   MOBILE OPTIMIZER STATE
========================= */

const MOBILE_OPTIMIZER_STATE = {

    initialized:false,

    isMobile:false,

    isTablet:false,

    lowMemory:false,

    lowCPU:false,

    batterySaver:false,

    touchDevice:false,

    viewportWidth:0,

    viewportHeight:0

};

/* =========================
   DEVICE DETECTION
========================= */

function detectDevice(){

    MOBILE_OPTIMIZER_STATE.viewportWidth =
        window.innerWidth;

    MOBILE_OPTIMIZER_STATE.viewportHeight =
        window.innerHeight;

    MOBILE_OPTIMIZER_STATE.touchDevice =
        (
            'ontouchstart' in window
        );

    MOBILE_OPTIMIZER_STATE.isMobile =
        MOBILE_OPTIMIZER_STATE.viewportWidth <= 768;

    MOBILE_OPTIMIZER_STATE.isTablet =
        (
            MOBILE_OPTIMIZER_STATE.viewportWidth > 768 &&
            MOBILE_OPTIMIZER_STATE.viewportWidth <= 1200
        );

}

/* =========================
   HARDWARE DETECTION
========================= */

function detectHardwareLimits(){

    const memory =
        navigator.deviceMemory || 4;

    const cpu =
        navigator.hardwareConcurrency || 4;

    MOBILE_OPTIMIZER_STATE.lowMemory =
        memory <= 4;

    MOBILE_OPTIMIZER_STATE.lowCPU =
        cpu <= 4;

}

/* =========================
   LOW SPEC PROFILE
========================= */

function applyLowSpecProfile(){

    if(
        !MOBILE_OPTIMIZER_STATE.lowMemory &&
        !MOBILE_OPTIMIZER_STATE.lowCPU
    ){
        return;
    }

    document.body.classList.add(
        'low-performance-mode'
    );

}

/* =========================
   VIEWPORT FIX
========================= */

function updateViewportHeight(){

    const vh =
        window.innerHeight * 0.01;

    document.documentElement.style.setProperty(
        '--vh',
        `${vh}px`
    );

}

/* =========================
   GPU ACCELERATION
========================= */

function enableGPULayers(){

    const layers =
        document.querySelectorAll(
            '.portal-frame'
        );

    layers.forEach((layer)=>{

        layer.style.willChange =
            'opacity';

        layer.style.transform =
            'translate3d(0,0,0)';

    });

}

/* =========================
   IMAGE DECODE
========================= */

async function decodePortalImages(){

    const images =
        document.querySelectorAll(
            '.portal-frame'
        );

    const tasks = [];

    images.forEach((image)=>{

        if(
            typeof image.decode !==
            'function'
        ){
            return;
        }

        tasks.push(

            image.decode()
                .catch(()=>{})

        );

    });

    await Promise.all(tasks);

}

/* =========================
   TOUCH OPTIMIZATION
========================= */

function applyTouchOptimization(){

    if(
        !MOBILE_OPTIMIZER_STATE.touchDevice
    ){
        return;
    }

    document.body.classList.add(
        'mobile-optimized'
    );

}

/* =========================
   BATTERY PROFILE
========================= */

async function detectBatterySaver(){

    if(
        !('getBattery' in navigator)
    ){
        return;
    }

    try{

        const battery =
            await navigator.getBattery();

        MOBILE_OPTIMIZER_STATE.batterySaver =
            (
                battery.level <= 0.20 ||
                battery.charging === false
            );

        if(
            MOBILE_OPTIMIZER_STATE.batterySaver
        ){

            document.body.classList.add(
                'low-performance-mode'
            );

        }

    }catch(error){

        console.warn(
            '[BATTERY API UNAVAILABLE]',
            error
        );

    }

}

/* =========================
   RESIZE
========================= */

function handleResize(){

    detectDevice();

    updateViewportHeight();

}

/* =========================
   INITIALIZE
========================= */

export async function initializeMobileOptimizer(){

    if(
        MOBILE_OPTIMIZER_STATE.initialized
    ){
        return;
    }

    MOBILE_OPTIMIZER_STATE.initialized =
        true;

    detectDevice();

    detectHardwareLimits();

    updateViewportHeight();

    applyLowSpecProfile();

    applyTouchOptimization();

    enableGPULayers();

    await decodePortalImages();

    await detectBatterySaver();

    window.addEventListener(
        'resize',
        handleResize,
        { passive:true }
    );

    console.info(
        '[MOBILE OPTIMIZER READY]'
    );

}

/* =========================
   DESTROY
========================= */

export function destroyMobileOptimizer(){

    window.removeEventListener(
        'resize',
        handleResize
    );

    MOBILE_OPTIMIZER_STATE.initialized =
        false;

}

/* =========================
   GET STATE
========================= */

export function getMobileOptimizerState(){

    return {

        initialized:
            MOBILE_OPTIMIZER_STATE.initialized,

        isMobile:
            MOBILE_OPTIMIZER_STATE.isMobile,

        isTablet:
            MOBILE_OPTIMIZER_STATE.isTablet,

        lowMemory:
            MOBILE_OPTIMIZER_STATE.lowMemory,

        lowCPU:
            MOBILE_OPTIMIZER_STATE.lowCPU,

        batterySaver:
            MOBILE_OPTIMIZER_STATE.batterySaver

    };

}

/* =========================
   CLEANUP
========================= */

window.addEventListener(
    'beforeunload',
    destroyMobileOptimizer,
    { passive:true }
); 
