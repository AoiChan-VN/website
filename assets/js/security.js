/**
 * @security Final Protection
 * @author AoiChan
 */
(function() {
    'use strict';
    // Chặn chuột phải
    document.addEventListener('contextmenu', e => e.preventDefault());
    
    // Chặn phím tắt DevTools
    document.addEventListener('keydown', e => {
        if (
            e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || 
            (e.ctrlKey && e.keyCode === 85)
        ) {
            e.preventDefault();
            return false;
        }
    });

    // Chặn kéo thả hình ảnh/nội dung
    document.addEventListener('dragstart', e => e.preventDefault());
    
    console.log("%cCopyright AoiChan - Website Protected", "color: #00ff88; font-size: 14px; font-weight: bold;");
})();
