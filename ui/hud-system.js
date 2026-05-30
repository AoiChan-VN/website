// FILE: ui/hud-system.js

/* =========================
   HUD STATE
========================= */

const HUD_STATE = {

    initialized:false,

    root:null,

    statusBar:null,

    statusText:null,

    currentStatus:'READY'

};

/* =========================
   CREATE ROOT
========================= */

function createStatusBar(){

    const container =
        document.createElement('div');

    container.id =
        'hud-status-bar';

    const text =
        document.createElement('span');

    text.id =
        'hud-status-text';

    text.textContent =
        'SYSTEM READY';

    container.appendChild(
        text
    );

    return {
        container,
        text
    };

}

/* =========================
   BUILD HUD
========================= */

function buildHUD(){

    const hud =
        createStatusBar();

    document.body.appendChild(
        hud.container
    );

    HUD_STATE.root =
        hud.container;

    HUD_STATE.statusBar =
        hud.container;

    HUD_STATE.statusText =
        hud.text;

}

/* =========================
   SET STATUS
========================= */

export function setHUDStatus(
    message
){

    HUD_STATE.currentStatus =
        String(message);

    if(
        !HUD_STATE.statusText
    ){
        return;
    }

    HUD_STATE.statusText.textContent =
        HUD_STATE.currentStatus;

}

/* =========================
   PORTAL STATUS
========================= */

export function setPortalReady(){

    setHUDStatus(
        'PORTAL READY'
    );

}

export function setPortalLoading(){

    setHUDStatus(
        'LOADING ASSETS'
    );

}

export function setPortalSleeping(){

    setHUDStatus(
        'POWER SAVE MODE'
    );

}

export function setPortalActive(){

    setHUDStatus(
        'GYRO MATRIX ACTIVE'
    );

}

export function setDocumentMode(){

    setHUDStatus(
        'DOCUMENT VIEWER'
    );

}

/* =========================
   SHOW
========================= */

export function showHUD(){

    if(
        !HUD_STATE.root
    ){
        return;
    }

    HUD_STATE.root.style.display =
        'flex';

}

/* =========================
   HIDE
========================= */

export function hideHUD(){

    if(
        !HUD_STATE.root
    ){
        return;
    }

    HUD_STATE.root.style.display =
        'none';

}

/* =========================
   INITIALIZE
========================= */

export function initializeHUDSystem(){

    if(
        HUD_STATE.initialized
    ){
        return;
    }

    buildHUD();

    setPortalReady();

    HUD_STATE.initialized =
        true;

}

/* =========================
   DESTROY
========================= */

export function destroyHUDSystem(){

    if(
        HUD_STATE.root &&
        HUD_STATE.root.parentNode
    ){

        HUD_STATE.root.parentNode
            .removeChild(
                HUD_STATE.root
            );

    }

    HUD_STATE.root = null;
    HUD_STATE.statusBar = null;
    HUD_STATE.statusText = null;

    HUD_STATE.initialized =
        false;

}

/* =========================
   GET STATE
========================= */

export function getHUDState(){

    return {

        initialized:
            HUD_STATE.initialized,

        status:
            HUD_STATE.currentStatus

    };

}

/* =========================
   CLEANUP
========================= */

window.addEventListener(
    'beforeunload',
    destroyHUDSystem,
    { passive:true }
); 
