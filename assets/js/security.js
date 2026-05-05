/**
 * @project Portfolio Chuẩn Quốc Tế
 * @author AoiChan
 * @security Anti-Hack & Protection
 */
document.onkeydown = function(e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        return false;
    }
};
document.addEventListener('contextmenu', event => event.preventDefault());
console.log('%cProtected by AoiChan System', 'color: red; font-size: 20px; font-weight: bold;');
 
