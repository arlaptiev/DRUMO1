class Mixer {
  constructor() {
    this.channels = _.times(9, i => new Channel(i));
  }

  run () {
    // Register Key Presses for all channels
    this.channels.forEach(channel => channel.keyPressed = keyIsDown(channel.instrument));

    // Run all channels
    this.channels.forEach(channel => channel.run());
  }
}

class Channel {
  constructor(instrument) {
    this.instrument = instrument;
    this.pattern = _.times(getDrumState().patternLength, i => []);
    this.userInput;
    this.state = 'PLAY' // PLAY, INPUT, GEN
    this.keyPressed = false;
    // this.volume = 0;
    // this.pan = 0;
    // this.mute = false;
    // this.solo = false;
  }

  run() {
    switch (this.state) {
      case 'PLAY':
        if (this.keyPressed) {
          this.state = "INPUT";
        }
      case 'INPUT':
        if (!this.keyPressed) {
          this.state = "GEN";
        }
      case 'GEN':
        break;
      default:
        break;
    }
  }
}