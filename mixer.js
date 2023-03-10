DEFAULT_PATTERN_LENGTH = 32;

class Mixer {
  constructor() {
    this.channels = _.times(9, i => new Channel(this, i + 1));
    this.state = 'LOAD' // LOAD, PLAY
    this.pattern = _.times(DEFAULT_PATTERN_LENGTH, i => []);
    this.stepIndex;
    this.drumsReady = false;

    // Start drums when they are ready
    whenAvailable('drumsReady', () => {
      playPauseDrums();
      this.drumsReady = true;
      this.state = "PLAY";
    });
  }

  run () {
    /**
     * Main control loop
     */
    switch (this.state) {
      case 'LOAD':
        break;

      case 'PLAY':
        // Update step index
        this.stepIndex = getDrumStepCounter() % getDrumState().patternLength;

        // Run all channels
        this.channels.forEach(channel => channel.run());

      default:
        break;
    }
  }

  changePatternLength (len) {
    /**
     * If the new length is smaller than the current one, we just truncate the pattern
     */
    this.pattern = _.times(len, i => {
      if (i < this.pattern.length)
        return this.pattern[i]
      return [];
    });
    this.channels.forEach(channel => {
      channel.pattern = _.times(len, i => {
        if (i < channel.pattern.length)
          return channel.pattern[i]
        return [];
      });
    })
  }

  updatePattern () {
    /**
     * Update the pattern based on the current state of the channels
     */
    // update pattern internally
    this.pattern = _.times(this.pattern.length, i => {
      // repeating instruments just count as one
      let instruments = new Set();
      this.channels.forEach(channel => {
        channel.pattern[i].forEach(instrument => instruments.add(instrument));
      });
      return Array.from(instruments);
    });
    console.log('pattern', this.pattern)
    // update pattern in drums
    setDrumState({pattern: this.pattern});
  }

  tap () {
    /**
     * Tap the current step, set user input
    */
    if (mixer.drumsReady && this.stepIndex > -1) {
      this.channels.forEach(channel => {
        // Check if any instrument is active
        if (channel.keyPressed) {
          // Update the user input
          let index = (this.stepIndex - channel.userInputStartIdx + this.pattern.length) % this.pattern.length;
          channel.userInput[index] = [channel.instrument];
        }
      });
    }
  }
}

class Channel {
  constructor(mixer, instrument) {
    this.mixer = mixer;
    this.instrument = instrument; // 1-9
    this.instrumentName = DRUM_CLASSES[instrument - 1]
    this.pattern = _.times(DEFAULT_PATTERN_LENGTH, i => []);
    this.userInput;
    this.userInputStartIdx;
    this.state = 'PLAY' // PLAY, INPUT, GEN
    this.keyPressed = false;
    this.shiftPressed = false;
    // this.volume = 0;
    // this.pan = 0;
    // this.mute = false;
    // this.solo = false;
  }

  run () {
    // Check if activated
    this.keyPressed = keyIsDown(this.instrument + 48);
    this.shiftPressed = keyIsDown(16);

    switch (this.state) {

      case 'PLAY':
        // Button pressed, shift pressed, clear pattern
        if (this.keyPressed && this.shiftPressed) {
          this.pattern = _.times(this.pattern.length, i => []);
          this.mixer.updatePattern();
          break;
        }

        // Button pressed, switch state
        if (this.keyPressed) {
          // Record start index
          this.userInputStartIdx = this.mixer.stepIndex;
          // Initiate the empty user input
          this.userInput = [[], []]

          // Switch state
          this.state = "INPUT";
        }
        break;

      case 'INPUT':
        // Calculate new length based on current step index
        let len = (this.pattern.length + this.mixer.stepIndex - this.userInputStartIdx + 1) % this.pattern.length;

        // Held for the whole cycle (drum mode), switch state
        if (len > this.pattern.length) {
          this.state = "GEN";
        }

        // Button lifted, switch state
        if (!this.keyPressed) {
          this.state = "GEN";
          console.log('Generate!')
        }

        // Update user input to new length
        // TODO Make sure we are not adding one extra
        if (len >= this.userInput.length) {
          this.userInput.push([]);
        }
        break;

      case 'GEN':
        // TODO IDEA: GENERATE SECOND PATTERN BACKWARDS OUTPUT TO INPUT TO INFILL INPUT? Maybe will not reflect your input well enough

        // Reformat empty user input
        let userInputIsEmpty = _.every(this.userInput, (arr) => arr.length == 0);

        if (userInputIsEmpty) {
          if (this.userInput.length < 4) {
            // Single tap input
            this.userInput = [[this.instrument]]
            let userInputIdx = this.userInputStartIdx // this.userInputStartIdx is going to be nullified, so we need to save it
            generateSequence(this.userInput, this.pattern.length - 1).then(
              result => {
                for (let i = 0; i < this.pattern.length; i++) {
                  this.pattern[(userInputIdx + i) % result.length] = result[i]
                }
                this.mixer.updatePattern();
              }
            );
          } else {
            // No input
            this.userInput = null
          }
        } else if (this.userInput.length < this.pattern.length) {
          // Generate if input length < pattern length
          let userInputIdx = this.userInputStartIdx // this.userInputStartIdx is going to be nullified, so we need to save it
          generateSequence(this.userInput, this.pattern.length - this.userInput.length).then(
            result => {
              for (let i = 0; i < this.pattern.length; i++) {
                this.pattern[(userInputIdx + i) % result.length] = result[i]
              }
              this.mixer.updatePattern();
            }
          );
        } else {
          // Full length input, just update pattern
          this.pattern = this.userInput.slice(0, this.pattern.length);
          this.mixer.updatePattern();
        }

        // Reset input
        this.userInput = null;
        this.userInputStartIdx = null;

        // Switch state
        this.state = "PLAY";
        break;

      default:
        break;
    }
  }
}