/* 
 * Security Firewall Layer
 * Chống F12, chuột phải, Inspect, và lọc Input
 */
const SecurityLayer = {
    init: function() {
        this.preventInspect();
        this.cleanInputs();
        console.log("Security Shield: Active");
    },
    preventInspect: function() {
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.onkeydown = (e) => {
            if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74))) {
                return false;
            }
        };
    },
    cleanInputs: function() {
        // Tự động khử độc mọi input (Chống XSS)
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                input.value = input.value.replace(/<[^>]*>?/gm, '');
            });
        });
    }
};
export default SecurityLayer;
 
