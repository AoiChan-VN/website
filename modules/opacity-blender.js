// FILE: modules/opacity-blender.js

/* =========================
   FRAME REFERENCES
========================= */

const FRAME_MAP = {

    center:null,

    north:null,
    south:null,

    east:null,
    west:null,

    northEast:null,
    northWest:null,

    southEast:null,
    southWest:null

};

/* =========================
   BLENDER STATE
========================= */

const BLENDER_STATE = {

    initialized:false,

    maxOpacity:1,

    minOpacity:0,

    smoothing:0.12,

    current:{
        north:0,
        south:0,
        east:0,
        west:0,
        northEast:0,
        northWest:0,
        southEast:0,
        southWest:0,
        center:1
    }

};

/* =========================
   LERP
========================= */

function lerp(start, end, factor){

    return start + (
        (end - start) * factor
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
   DOM CACHE
========================= */

function cacheFrames(){

    FRAME_MAP.center =
        document.getElementById('portal-center');

    FRAME_MAP.north =
        document.getElementById('portal-north');

    FRAME_MAP.south =
        document.getElementById('portal-south');

    FRAME_MAP.east =
        document.getElementById('portal-east');

    FRAME_MAP.west =
        document.getElementById('portal-west');

    FRAME_MAP.northEast =
        document.getElementById('portal-north-east');

    FRAME_MAP.northWest =
        document.getElementById('portal-north-west');

    FRAME_MAP.southEast =
        document.getElementById('portal-south-east');

    FRAME_MAP.southWest =
        document.getElementById('portal-south-west');

}

/* =========================
   APPLY OPACITY
========================= */

function applyOpacity(){

    FRAME_MAP.center.style.opacity =
        BLENDER_STATE.current.center;

    FRAME_MAP.north.style.opacity =
        BLENDER_STATE.current.north;

    FRAME_MAP.south.style.opacity =
        BLENDER_STATE.current.south;

    FRAME_MAP.east.style.opacity =
        BLENDER_STATE.current.east;

    FRAME_MAP.west.style.opacity =
        BLENDER_STATE.current.west;

    FRAME_MAP.northEast.style.opacity =
        BLENDER_STATE.current.northEast;

    FRAME_MAP.northWest.style.opacity =
        BLENDER_STATE.current.northWest;

    FRAME_MAP.southEast.style.opacity =
        BLENDER_STATE.current.southEast;

    FRAME_MAP.southWest.style.opacity =
        BLENDER_STATE.current.southWest;

}

/* =========================
   BLEND CALCULATION
========================= */

function calculateBlend(beta, gamma){

    const vertical =
        beta / 45;

    const horizontal =
        gamma / 45;

    const north =
        clamp(-vertical, 0, 1);

    const south =
        clamp(vertical, 0, 1);

    const east =
        clamp(horizontal, 0, 1);

    const west =
        clamp(-horizontal, 0, 1);

    const northEast =
        north * east;

    const northWest =
        north * west;

    const southEast =
        south * east;

    const southWest =
        south * west;

    let center =
        1 - (
            north +
            south +
            east +
            west
        ) * 0.5;

    center =
        clamp(center, 0, 1);

    return {

        north,
        south,

        east,
        west,

        northEast,
        northWest,

        southEast,
        southWest,

        center

    };

}

/* =========================
   UPDATE OPACITY
========================= */

export function updateOpacityBlend(rotation){

    if(!BLENDER_STATE.initialized){
        return;
    }

    const blend =
        calculateBlend(
            rotation.beta,
            rotation.gamma
        );

    Object.keys(BLENDER_STATE.current)
        .forEach((key)=>{

            BLENDER_STATE.current[key] =
                lerp(
                    BLENDER_STATE.current[key],
                    blend[key],
                    BLENDER_STATE.smoothing
                );

        });

    applyOpacity();

}

/* =========================
   INITIALIZE
========================= */

export function initializeOpacityBlender(){

    if(BLENDER_STATE.initialized){
        return;
    }

    cacheFrames();

    BLENDER_STATE.initialized = true;

}

/* =========================
   RESET
========================= */

export function resetOpacityBlender(){

    Object.keys(BLENDER_STATE.current)
        .forEach((key)=>{

            BLENDER_STATE.current[key] =
                key === 'center'
                    ? 1
                    : 0;

        });

    applyOpacity();

}

/* =========================
   CONFIG
========================= */

export function configureOpacityBlender(config = {}){

    if(typeof config.smoothing === 'number'){

        BLENDER_STATE.smoothing =
            clamp(
                config.smoothing,
                0.01,
                1
            );

    }

}

/* =========================
   DESTROY
========================= */

export function destroyOpacityBlender(){

    BLENDER_STATE.initialized = false;

} 
