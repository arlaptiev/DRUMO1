
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
        console.log('A PRESS', controller.userInput)

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

    if (key == 'B' || key == 'b') {
        console.log('USRINPT', controller.userInput)
        console.log('STEP', controller.stepIndx)
      }
    
    // When you press the letter R, the game resets back to the play state
    if (key == 'R' || key == 'r') {
        controller.gameState = "PLAY";
    }
  }