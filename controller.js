
// This is where your state machines and game logic lives


class Controller {

    // This is the state we start with.
    constructor() {
        this.gameState = "LOAD";
        this.stepIndx;
        this.userInput;
        this.defaultInstrument = 1;

        whenAvailable('drumsReady', () => {
            playPauseDrums();
            this.gameState = "PLAY";
        });
    }
    
    // This is called from draw() in sketch.js with every frame
    update() {
        // STATE MACHINE ////////////////////////////////////////////////
        // This is where your game logic lives
        /////////////////////////////////////////////////////////////////

        switch(this.gameState) {

            case "LOAD":
                display.clear();
                display.setPixel(0, color(250, 0, 0))

                break;


            case "PLAY":

                // waiting for user input from keyPressed()

                // update step index
                this.stepIndx = getDrumStepCounter() % getDrumState().patternLength;

                // clear screen at frame rate so we always start fresh      
                display.clear();
                // display.setPixel(0, color(0, 250, 0))

                display.showPattern(getDrumState().pattern);
                display.showSlider(this.stepIndx);

                // switch mode
                if (this.stepIndx == getDrumState().seedLength) {
                    this.gameState = "GEN";
                }

                break;


            case "GEN":

                // update step index
                this.stepIndx = getDrumStepCounter() % getDrumState().patternLength;

                // generate drums if user input is available
                if (this.userInput) {
                    generateDrums(this.userInput);
                    this.userInput = null;
                }

                // clear screen at frame rate so we always start fresh      
                display.clear();
                // display.setPixel(0, color(0, 0, 250));

                display.showPattern(getDrumState().pattern);
                display.showSlider(this.stepIndx);

                // switch mode
                if (this.stepIndx == 0) {
                    this.gameState = "PLAY";
                }

                break;


            // Not used, it's here just for code compliance
            default:
                break;
        }
    }
}






// This function gets called when a key on the keyboard is pressed
function keyPressed() {

    // TODO remove overflow to neighbor steps
    if (key == 'A' || key == 'a') {

        // drum machine is ready
        if (window['drumsReady']) {
            let step = getDrumStepCounter() % getDrumState().patternLength;

            // only allow user input in play mode
            if (step > -1 && step < getDrumState().seedLength) {

                // initialize user input array
                if (!controller.userInput) {
                    controller.userInput = _.times(getDrumState().seedLength, i => []);
                }
                controller.userInput[controller.stepIndx] = [controller.defaultInstrument];
            } 
        }
      }

    // change tempo
    if (keyCode == UP_ARROW) {
        if (window['drumsReady']) {
            setDrumState({ tempo: getDrumState().tempo + 0.5 });
        }
      }
    if (keyCode == DOWN_ARROW) {
        if (window['drumsReady']) {
            setDrumState({ tempo: getDrumState().tempo - 0.5 });
        }
      }

    // change instrument
    if (key == '1' || key == '2' || key == '3' || key == '4' || key == '5' || key == '6' || key == '7' || key == '8' || key == '9') {
        controller.defaultInstrument = parseInt(key);
      }

    // change temperture
    if (key == ':' || key == ';') {
        if (window['drumsReady']) {
            let newTemp = getDrumState().temperature + 0.25 > 2 ? 2.0 : getDrumState().temperature + 0.25;
            setDrumState({ temperature: newTemp });
        }
      }
    if (key == 'L' || key == 'l') {
        if (window['drumsReady']) {
            let newTemp = getDrumState().temperature - 0.25 < 0 ? 0.0 : getDrumState().temperature - 0.25;
            setDrumState({ temperature: newTemp });
        }
    }
    
    // change swing
    if (key == '>' || key == '.') {
        if (window['drumsReady']) {
            let newSwing = getDrumState().swing + 0.25 > 1 ? 1.0 : getDrumState().swing + 0.25;
            setDrumState({ swing: newSwing });
        }
      }
    if (key == '<' || key == ',') {
        if (window['drumsReady']) {
            let newSwing = getDrumState().swing - 0.25 < 0 ? 0.0 : getDrumState().swing - 0.25;
            setDrumState({ swing: newSwing });
        }
    }
    
  }