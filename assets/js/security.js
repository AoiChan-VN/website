/**
 * @security AOI-SHIELD 2026
 * @author AoiChan
 */
(() => {
    const protect = () => {
        // Chống Debugger
        setInterval(() => { (function() { return false; }['constructor']('debugger')['call']()); }, 50);
        
        // Chặn phím tắt
        window.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key)) || (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
            }
        });

        // Chặn Context Menu
        document.addEventListener('contextmenu', e => e.preventDefault());
        
        // Chặn copy
        document.addEventListener('copy', e => e.preventDefault());
    };
    
    console.log('%cSystem Secured by AoiChan', 'background: #000; color: #00f2ff; font-size: 20px; padding: 10px;');
    protect();
})();
