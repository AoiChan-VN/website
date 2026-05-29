// FILE: core/engine.js

import { startRenderLoop } from './render-loop.js';
import { initializeEventManager } from './event-manager.js';

/* =========================
   ENGINE STATE
========================= */

const ENGINE_STATE = {

    initialized:false,

    assetsLoaded:false,

    loadingScreen:null,

    fpsCounter:null,

    gyroStatus:null,

    frameCount:0,

    lastFPSUpdate:performance.now(),

    fps:0

};

/* =========================
   DOM CACHE
========================= */

function cacheDOM(){

    ENGINE_STATE.loadingScreen =
        document.getElementById('loading-screen');

    ENGINE_STATE.fpsCounter =
        document.getElementById('fps-counter');

    ENGINE_STATE.gyroStatus =
        document.getElementById('gyro-status');

}

/* =========================
   IMAGE PRELOAD
========================= */

async function preloadPortalFrames(){

    const frames = document.querySelectorAll('.portal-frame');

    const preloadTasks = [];

    frames.forEach((frame)=>{

        preloadTasks.push(

            new Promise((resolve)=>{

                if(frame.complete){

                    resolve();
                    return;

                }

                const handleLoad = ()=>{

                    frame.removeEventListener(
                        'load',
                        handleLoad
                    );

                    frame.removeEventListener(
                        'error',
                        handleError
                    );

                    resolve();

                };

                const handleError = ()=>{

                    frame.removeEventListener(
                        'load',
                        handleLoad
                    );

                    frame.removeEventListener(
                        'error',
                        handleError
                    );

                    console.warn(
                        '[PORTAL FRAME FAILED]',
                        frame.src
                    );

                    resolve();

                };

                frame.addEventListener(
                    'load',
                    handleLoad,
                    { once:true }
                );

                frame.addEventListener(
                    'error',
                    handleError,
                    { once:true }
                );

            })

        );

    });

    await Promise.all(preloadTasks);

    ENGINE_STATE.assetsLoaded = true;

}

/* =========================
   LOADING SCREEN
========================= */

function hideLoadingScreen(){

    if(!ENGINE_STATE.loadingScreen){
        return;
    }

    ENGINE_STATE.loadingScreen.classList.add('hidden');

    window.setTimeout(()=>{

        if(ENGINE_STATE.loadingScreen){

            ENGINE_STATE.loadingScreen.remove();

            ENGINE_STATE.loadingScreen = null;

        }

    }, 600);

}

/* =========================
   FPS MONITOR
========================= */

function updateFPS(){

    ENGINE_STATE.frameCount++;

    const now = performance.now();

    const delta = now - ENGINE_STATE.lastFPSUpdate;

    if(delta >= 1000){

        ENGINE_STATE.fps =
            Math.round(
                (ENGINE_STATE.frameCount * 1000) / delta
            );

        ENGINE_STATE.frameCount = 0;

        ENGINE_STATE.lastFPSUpdate = now;

        if(ENGINE_STATE.fpsCounter){

            ENGINE_STATE.fpsCounter.textContent =
                String(ENGINE_STATE.fps);

        }

    }

}

/* =========================
   DEVICE CLASS
========================= */

function applyDeviceClass(){

    const width = window.innerWidth;

    document.body.classList.remove(
        'device-mobile',
        'device-tablet',
        'device-desktop'
    );

    if(width <= 768){

        document.body.classList.add(
            'device-mobile'
        );

        return;

    }

    if(width <= 1200){

        document.body.classList.add(
            'device-tablet'
        );

        return;

    }

    document.body.classList.add(
        'device-desktop'
    );

}

/* =========================
   PERFORMANCE DETECTION
========================= */

function detectLowPerformanceDevice(){

    const memory =
        navigator.deviceMemory || 4;

    const cores =
        navigator.hardwareConcurrency || 4;

    const isLowSpec =
        memory <= 4 || cores <= 4;

    if(isLowSpec){

        document.body.classList.add(
            'low-performance-mode'
        );

    }

}

/* =========================
   GYRO STATUS
========================= */

function updateGyroStatus(status){

    if(!ENGINE_STATE.gyroStatus){
        return;
    }

    ENGINE_STATE.gyroStatus.textContent =
        status;

}

/* =========================
   ENGINE START
========================= */

async function initializeEngine(){

    if(ENGINE_STATE.initialized){
        return;
    }

    ENGINE_STATE.initialized = true;

    cacheDOM();

    applyDeviceClass();

    detectLowPerformanceDevice();

    await preloadPortalFrames();

    initializeEventManager({
        onGyroReady:()=>{

            updateGyroStatus('ACTIVE');

        },

        onGyroDenied:()=>{

            updateGyroStatus('DENIED');

        },

        onGyroUnavailable:()=>{

            updateGyroStatus('UNSUPPORTED');

        }

    });

    startRenderLoop({

        onFrame:updateFPS

    });

    hideLoadingScreen();

    console.info(
        '[NATIVE PORTAL ENGINE READY]'
    );

}

/* =========================
   BOOT
========================= */

window.addEventListener(
    'load',
    initializeEngine,
    { once:true }
);

/* =========================
   VIEWPORT RESIZE
========================= */

window.addEventListener(
    'resize',
    applyDeviceClass,
    { passive:true }
); 
