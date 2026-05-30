// FILE: modules/document-viewer.js

/* =========================
   DOCUMENT VIEWER STATE
========================= */

const DOCUMENT_VIEWER_STATE = {

    initialized:false,

    container:null,

    currentFile:null,

    currentType:null,

    currentObjectURL:null

};

/* =========================
   FILE TYPES
========================= */

const TEXT_TYPES = [
    'txt',
    'text',
    'md'
];

const PDF_TYPES = [
    'pdf'
];

/* =========================
   DOM CACHE
========================= */

function cacheContainer(){

    DOCUMENT_VIEWER_STATE.container =
        document.getElementById(
            'document-viewer-container'
        );

}

/* =========================
   CLEAR VIEWER
========================= */

function clearViewer(){

    if(
        !DOCUMENT_VIEWER_STATE.container
    ){
        return;
    }

    DOCUMENT_VIEWER_STATE.container.innerHTML =
        '';

    if(
        DOCUMENT_VIEWER_STATE.currentObjectURL
    ){

        URL.revokeObjectURL(
            DOCUMENT_VIEWER_STATE.currentObjectURL
        );

        DOCUMENT_VIEWER_STATE.currentObjectURL =
            null;

    }

}

/* =========================
   FILE EXTENSION
========================= */

function getExtension(path){

    const parts =
        path.split('.');

    return (
        parts.pop() || ''
    ).toLowerCase();

}

/* =========================
   TEXT VIEWER
========================= */

async function renderTextFile(path){

    const response =
        await fetch(path);

    const content =
        await response.text();

    const pre =
        document.createElement('pre');

    pre.className =
        'document-text-view';

    pre.textContent =
        content;

    DOCUMENT_VIEWER_STATE.container
        .appendChild(pre);

}

/* =========================
   PDF VIEWER
========================= */

function renderPDFFile(path){

    const iframe =
        document.createElement('iframe');

    iframe.className =
        'document-pdf-view';

    iframe.src = path;

    iframe.loading = 'lazy';

    iframe.referrerPolicy =
        'no-referrer';

    DOCUMENT_VIEWER_STATE.container
        .appendChild(iframe);

}

/* =========================
   LOAD DOCUMENT
========================= */

export async function loadDocument(
    path
){

    if(
        !DOCUMENT_VIEWER_STATE.initialized
    ){

        throw new Error(
            'Document Viewer Not Initialized'
        );

    }

    clearViewer();

    const extension =
        getExtension(path);

    DOCUMENT_VIEWER_STATE.currentFile =
        path;

    DOCUMENT_VIEWER_STATE.currentType =
        extension;

    if(
        TEXT_TYPES.includes(
            extension
        )
    ){

        await renderTextFile(path);

        return;

    }

    if(
        PDF_TYPES.includes(
            extension
        )
    ){

        renderPDFFile(path);

        return;

    }

    throw new Error(
        `Unsupported file type: ${extension}`
    );

}

/* =========================
   CLOSE DOCUMENT
========================= */

export function closeDocument(){

    clearViewer();

    DOCUMENT_VIEWER_STATE.currentFile =
        null;

    DOCUMENT_VIEWER_STATE.currentType =
        null;

}

/* =========================
   INITIALIZE
========================= */

export function initializeDocumentViewer(){

    if(
        DOCUMENT_VIEWER_STATE.initialized
    ){
        return;
    }

    cacheContainer();

    DOCUMENT_VIEWER_STATE.initialized =
        true;

}

/* =========================
   DESTROY
========================= */

export function destroyDocumentViewer(){

    closeDocument();

    DOCUMENT_VIEWER_STATE.initialized =
        false;

}

/* =========================
   GET STATE
========================= */

export function getDocumentViewerState(){

    return {

        initialized:
            DOCUMENT_VIEWER_STATE.initialized,

        currentFile:
            DOCUMENT_VIEWER_STATE.currentFile,

        currentType:
            DOCUMENT_VIEWER_STATE.currentType

    };

}

/* =========================
   CLEANUP
========================= */

window.addEventListener(
    'beforeunload',
    destroyDocumentViewer,
    { passive:true }
); 
