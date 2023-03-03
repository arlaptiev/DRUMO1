
// This is where your state machines and game logic lives


class Controller {

    // This is the state we start with.
    constructor() {
        this.gameState = "LOAD";
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
                if (mixer.state != "LOAD") {
                    this.gameState = "PLAY";
                }
                break;


            case "PLAY":

                // clear screen at frame rate so we always start fresh      
                display.clear();
                // display.setPixel(0, color(0, 250, 0))

                display.showPattern(mixer.pattern);
                display.showSlider(mixer.stepIndex);

                break;

            // Not used, it's here just for code compliance
            default:
                break;
        }
    }
}






// This function gets called when a key on the keyboard is pressed
function keyPressed() {

    // Space bar
    // TODO remove overflow to neighbor steps
    if (keyCode === 32) {
        // drum machine is ready
        if (mixer.drumsReady) {
            mixer.tap();
        }
    }

    // TODO remove overflow to neighbor steps
    // if (key == 'A' || key == 'a') {

    //     // drum machine is ready
    //     if (window['drumsReady']) {
    //         let step = getDrumStepCounter() % getDrumState().patternLength;

    //         // only allow user input in play mode
    //         if (step > -1 && step < getDrumState().seedLength) {

    //             // initialize user input array
    //             if (!controller.userInput) {
    //                 controller.userInput = _.times(getDrumState().seedLength, i => []);
    //             }
    //             controller.userInput[controller.stepIndx] = [controller.defaultInstrument];
    //         } 
    //     }
    //   }

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
    // if (key == '1' || key == '2' || key == '3' || key == '4' || key == '5' || key == '6' || key == '7' || key == '8' || key == '9') {
    //     controller.defaultInstrument = parseInt(key);
    //   }

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