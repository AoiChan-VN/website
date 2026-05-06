(() => {
    'use strict';
    // Chặn phím tắt & chuột phải
    document.addEventListener('contextmenu', e => e.preventDefault());
    window.addEventListener('keydown', e => {
        if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) || (e.ctrlKey && e.keyCode === 85)) {
            e.preventDefault();
        }
    });
    // Chặn Debugger
    setInterval(() => { (function(){}).constructor("debugger")() }, 100);
    console.log("%cAoiChan Protection Active", "color: #00f2ff; font-weight: bold;");
})();
