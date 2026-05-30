// FILE: ui/loading-screen.js

/* =========================
   LOADING SCREEN STATE
========================= */

const LOADING_SCREEN_STATE = {

    initialized:false,

    root:null,

    logo:null,

    text:null,

    visible:true

};

/* =========================
   CACHE DOM
========================= */

function cacheDOM(){

    LOADING_SCREEN_STATE.root =
        document.getElementById(
            'loading-screen'
        );

    LOADING_SCREEN_STATE.logo =
        document.getElementById(
            'loading-logo'
        );

    LOADING_SCREEN_STATE.text =
        document.getElementById(
            'loading-text'
        );

}

/* =========================
   SET MESSAGE
========================= */

export function setLoadingMessage(
    message
){

    if(
        !LOADING_SCREEN_STATE.text
    ){
        return;
    }

    LOADING_SCREEN_STATE.text.textContent =
        String(message);

}

/* =========================
   SHOW
========================= */

export function showLoadingScreen(){

    if(
        !LOADING_SCREEN_STATE.root
    ){
        return;
    }

    LOADING_SCREEN_STATE.visible = true;

    LOADING_SCREEN_STATE.root.classList.remove(
        'hidden'
    );

}

/* =========================
   HIDE
========================= */

export function hideLoadingScreen(){

    if(
        !LOADING_SCREEN_STATE.root
    ){
        return;
    }

    LOADING_SCREEN_STATE.visible = false;

    LOADING_SCREEN_STATE.root.classList.add(
        'hidden'
    );

}

/* =========================
   LOGO EFFECT
========================= */

function activateLogoAnimation(){

    if(
        !LOADING_SCREEN_STATE.logo
    ){
        return;
    }

    LOADING_SCREEN_STATE.logo.classList.add(
        'loading-pulse'
    );

}

/* =========================
   REMOVE EFFECT
========================= */

function deactivateLogoAnimation(){

    if(
        !LOADING_SCREEN_STATE.logo
    ){
        return;
    }

    LOADING_SCREEN_STATE.logo.classList.remove(
        'loading-pulse'
    );

}

/* =========================
   INITIALIZE
========================= */

export function initializeLoadingScreen(){

    if(
        LOADING_SCREEN_STATE.initialized
    ){
        return;
    }

    cacheDOM();

    activateLogoAnimation();

    LOADING_SCREEN_STATE.initialized =
        true;

}

/* =========================
   DESTROY
========================= */

export function destroyLoadingScreen(){

    deactivateLogoAnimation();

    LOADING_SCREEN_STATE.initialized =
        false;

}

/* =========================
   GET STATE
========================= */

export function getLoadingScreenState(){

    return {

        initialized:
            LOADING_SCREEN_STATE.initialized,

        visible:
            LOADING_SCREEN_STATE.visible

    };

}

/* =========================
   CLEANUP
========================= */

window.addEventListener(
    'beforeunload',
    destroyLoadingScreen,
    { passive:true }
); 
