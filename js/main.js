const audio = document.getElementById('bg-audio');

window.toggleMusic = () => {
    const isMuted = document.getElementById('music-toggle').checked;
    isMuted ? audio.play() : audio.pause();
    localStorage.setItem('music_pref', isMuted);
};

window.changeTrack = (src) => {
    audio.src = src;
    if(document.getElementById('music-toggle').checked) audio.play();
};

window.openSettings = () => document.getElementById('settings-modal').style.display = 'block';
window.closeSettings = () => document.getElementById('settings-modal').style.display = 'none';
 
