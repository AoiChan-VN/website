// FILE: core/engine.js

import { startRenderLoop } from './render-loop.js';
import { initializeEventManager } from './event-manager.js';
import { initializeGyroMatrix } from './gyro-matrix.js';
import { initializeMobileOptimizer } from './mobile-optimizer.js';

import {
    initializeLoadingScreen,
    hideLoadingScreen as hideUILoadingScreen
} from '../ui/loading-screen.js';

import {
    initializeNavbar
} from '../ui/navbar.js';

import {
    initializeHUDSystem,
    setPortalLoading,
    setPortalReady,
    setPortalActive
} from '../ui/hud-system.js';

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

    fps:0,

    lastFPSUpdate:
        performance.now(),

    preloadWorker:null

};

/* =========================
   DOM CACHE
========================= */

function cacheDOM(){

    ENGINE_STATE.loadingScreen =
        document.getElementById(
            'loading-screen'
        );

    ENGINE_STATE.fpsCounter =
        document.getElementById(
            'fps-counter'
        );

    ENGINE_STATE.gyroStatus =
        document.getElementById(
            'gyro-status'
        );

}

/* =========================
   PORTAL IMAGES
========================= */

function getPortalImages(){

    return [

        './assets/images/portal/center.webp',

        './assets/images/portal/north.webp',
        './assets/images/portal/south.webp',

        './assets/images/portal/east.webp',
        './assets/images/portal/west.webp',

        './assets/images/portal/north-east.webp',
        './assets/images/portal/north-west.webp',

        './assets/images/portal/south-east.webp',
        './assets/images/portal/south-west.webp'

    ];

}

/* =========================
   WORKER PRELOAD
========================= */

async function preloadWorkerAssets(){

    return new Promise((resolve)=>{

        const worker =
            new Worker(
                './workers/image-preload-worker.js'
            );

        ENGINE_STATE.preloadWorker =
            worker;

        worker.addEventListener(
            'message',
            (event)=>{

                const data =
                    event.data;

                if(
                    data.type === 'ready'
                ){

                    worker.postMessage({

                        type:'preload',

                        images:
                            getPortalImages()

                    });

                    return;

                }

                if(
                    data.type === 'complete'
                ){

                    ENGINE_STATE.assetsLoaded =
                        true;

                    resolve();

                }

            }
        );

    });

}

/* =========================
   IMAGE VERIFY
========================= */

async function verifyImagesLoaded(){

    const frames =
        document.querySelectorAll(
            '.portal-frame'
        );

    const tasks = [];

    frames.forEach((frame)=>{

        tasks.push(

            new Promise((resolve)=>{

                if(frame.complete){

                    resolve();
                    return;

                }

                frame.addEventListener(
                    'load',
                    resolve,
                    { once:true }
                );

                frame.addEventListener(
                    'error',
                    resolve,
                    { once:true }
                );

            })

        );

    });

    await Promise.all(
        tasks
    );

}

/* =========================
   FPS
========================= */

function updateFPS(){

    ENGINE_STATE.frameCount++;

    const now =
        performance.now();

    const delta =
        now -
        ENGINE_STATE.lastFPSUpdate;

    if(delta < 1000){
        return;
    }

    ENGINE_STATE.fps =
        Math.round(
            (
                ENGINE_STATE.frameCount *
                1000
            ) / delta
        );

    ENGINE_STATE.frameCount = 0;

    ENGINE_STATE.lastFPSUpdate =
        now;

    if(
        ENGINE_STATE.fpsCounter
    ){

        ENGINE_STATE.fpsCounter.textContent =
            String(
                ENGINE_STATE.fps
            );

    }

}

/* =========================
   GYRO STATUS
========================= */

function setGyroStatus(text){

    if(
        !ENGINE_STATE.gyroStatus
    ){
        return;
    }

    ENGINE_STATE.gyroStatus.textContent =
        text;

}

/* =========================
   EVENT MANAGER
========================= */

function initializeNativeEvents(){

    initializeEventManager({

        onGyroReady:()=>{

            setGyroStatus(
                'ACTIVE'
            );

            setPortalActive();

        },

        onGyroDenied:()=>{

            setGyroStatus(
                'DENIED'
            );

        },

        onGyroUnavailable:()=>{

            setGyroStatus(
                'UNSUPPORTED'
            );

        }

    });

}

/* =========================
   UI BOOT
========================= */

function initializeUI(){

    initializeLoadingScreen();

    initializeNavbar();

    initializeHUDSystem();

}

/* =========================
   HIDE LOADER
========================= */

function completeBoot(){

    setPortalReady();

    hideUILoadingScreen();

}

/* =========================
   WORKER CLEANUP
========================= */

function cleanupWorker(){

    if(
        !ENGINE_STATE.preloadWorker
    ){
        return;
    }

    ENGINE_STATE.preloadWorker.terminate();

    ENGINE_STATE.preloadWorker =
        null;

}

/* =========================
   ENGINE START
========================= */

async function initializeEngine(){

    if(
        ENGINE_STATE.initialized
    ){
        return;
    }

    ENGINE_STATE.initialized =
        true;

    cacheDOM();

    initializeUI();

    setPortalLoading();

    await initializeMobileOptimizer();

    await preloadWorkerAssets();

    await verifyImagesLoaded();

    initializeNativeEvents();

    initializeGyroMatrix();

    startRenderLoop({

        onFrame:updateFPS

    });

    completeBoot();

    console.info(
        '[PORTAL ENGINE ONLINE]'
    );

}

/* =========================
   CLEANUP
========================= */

function destroyEngine(){

    cleanupWorker();

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
   CLEANUP
========================= */

window.addEventListener(
    'beforeunload',
    destroyEngine,
    { passive:true }
); 
