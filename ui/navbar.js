// FILE: ui/navbar.js

/* =========================
   NAVBAR STATE
========================= */

const NAVBAR_STATE = {

    initialized:false,

    root:null,

    buttons:new Map(),

    listeners:new Map()

};

/* =========================
   NAV ITEMS
========================= */

const NAV_ITEMS = [

    {
        id:'home',
        label:'HOME'
    },

    {
        id:'portal',
        label:'PORTAL'
    },

    {
        id:'library',
        label:'LIBRARY'
    }

];

/* =========================
   CREATE ROOT
========================= */

function createNavbarRoot(){

    const navbar =
        document.createElement('nav');

    navbar.id =
        'portal-navbar';

    return navbar;

}

/* =========================
   CREATE BUTTON
========================= */

function createButton(item){

    const button =
        document.createElement('button');

    button.type =
        'button';

    button.className =
        'portal-nav-button safe-tap';

    button.dataset.nav =
        item.id;

    button.textContent =
        item.label;

    return button;

}

/* =========================
   EMIT EVENT
========================= */

function emitNavigation(id){

    window.dispatchEvent(

        new CustomEvent(
            'portal-navigation',
            {
                detail:{
                    route:id
                }
            }
        )

    );

}

/* =========================
   BUILD NAVBAR
========================= */

function buildNavbar(){

    const navbar =
        createNavbarRoot();

    NAV_ITEMS.forEach((item)=>{

        const button =
            createButton(item);

        const handler = ()=>{

            setActiveRoute(
                item.id
            );

            emitNavigation(
                item.id
            );

        };

        button.addEventListener(
            'click',
            handler,
            { passive:true }
        );

        NAVBAR_STATE.buttons.set(
            item.id,
            button
        );

        NAVBAR_STATE.listeners.set(
            item.id,
            handler
        );

        navbar.appendChild(
            button
        );

    });

    document.body.appendChild(
        navbar
    );

    NAVBAR_STATE.root =
        navbar;

}

/* =========================
   SET ACTIVE
========================= */

export function setActiveRoute(
    routeId
){

    NAVBAR_STATE.buttons.forEach(
        (button)=>{

            button.style.opacity =
                '0.55';

        }
    );

    const active =
        NAVBAR_STATE.buttons.get(
            routeId
        );

    if(active){

        active.style.opacity =
            '1';

    }

}

/* =========================
   SHOW
========================= */

export function showNavbar(){

    if(
        !NAVBAR_STATE.root
    ){
        return;
    }

    NAVBAR_STATE.root.style.display =
        'flex';

}

/* =========================
   HIDE
========================= */

export function hideNavbar(){

    if(
        !NAVBAR_STATE.root
    ){
        return;
    }

    NAVBAR_STATE.root.style.display =
        'none';

}

/* =========================
   INITIALIZE
========================= */

export function initializeNavbar(){

    if(
        NAVBAR_STATE.initialized
    ){
        return;
    }

    buildNavbar();

    setActiveRoute(
        'home'
    );

    NAVBAR_STATE.initialized =
        true;

}

/* =========================
   DESTROY
========================= */

export function destroyNavbar(){

    NAVBAR_STATE.buttons.forEach(
        (button, id)=>{

            const listener =
                NAVBAR_STATE.listeners.get(
                    id
                );

            if(listener){

                button.removeEventListener(
                    'click',
                    listener
                );

            }

        }
    );

    NAVBAR_STATE.buttons.clear();

    NAVBAR_STATE.listeners.clear();

    if(
        NAVBAR_STATE.root &&
        NAVBAR_STATE.root.parentNode
    ){

        NAVBAR_STATE.root.parentNode
            .removeChild(
                NAVBAR_STATE.root
            );

    }

    NAVBAR_STATE.root = null;

    NAVBAR_STATE.initialized =
        false;

}

/* =========================
   GET STATE
========================= */

export function getNavbarState(){

    return {

        initialized:
            NAVBAR_STATE.initialized,

        buttonCount:
            NAVBAR_STATE.buttons.size

    };

}

/* =========================
   CLEANUP
========================= */

window.addEventListener(
    'beforeunload',
    destroyNavbar,
    { passive:true }
); 
