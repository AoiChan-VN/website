export const AudioService = {

  context:null,

  initialize(){

    this.context =
      new AudioContext();

  },

  beep(){

    const oscillator =
      this.context.createOscillator();

    const gain =
      this.context.createGain();

    oscillator.connect(gain);

    gain.connect(
      this.context.destination
    );

    oscillator.frequency.value =
      540;

    oscillator.start();

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      this.context.currentTime + .12
    );

    oscillator.stop(
      this.context.currentTime + .12
    );

  }

}; 
