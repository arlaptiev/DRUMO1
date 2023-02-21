/* /////////////////////////////////////

  4.043 / 4.044 Design Studio: Interaction Intelligence
  February  9, 2023
  Marcelo Coelho

  If you come from Processing, there is a Processing version here. 
  Keep in mind that there are some differences between both versions:
  https://github.com/marcelocoelho/Interface1D

*/ /////////////////////////////////////


let displaySize = 32;   // how many pixels are visible in the game
let pixelSize = 30;     // how big should they look on screen

let display;      // Aggregates our final visual output before showing it on the screen

let controller;   // This is where the state machine and game logic lives

let collisionAnimation;   // Where we store and manage the collision animation



function setup() {

  createCanvas((displaySize*pixelSize), pixelSize);     // dynamically sets canvas size

  display = new Display(displaySize, pixelSize);        //Initializing the display

  collisionAnimation = new Animation();     // Initializing animation

  controller = new Controller();            // Initializing controller

}

function draw() {

  // start with a blank screen
  background(0, 0, 0);    

  // Runs state machine at determined framerate
  controller.update();

  // After we've updated our states, we show the current one 
  display.show();


}


function whenAvailable(name, callback) {
  console.log('waiting for', name)
  var interval = 50; // ms
  window.setTimeout(function() {
      if (window[name]) {
          callback(window[name]);
      } else {
          whenAvailable(name, callback);
      }
  }, interval);
}
