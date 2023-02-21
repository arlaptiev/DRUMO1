// This is used to aggregrate visual information from all objects before we display them. 
// First we populate display and then we show it to user.
// This is particularly helpful once you start outputting your game to an LED strip, of if you want to have two separate 'screens'

let R=0;
      let G=0;
      let B=0;
      let RTotal=20;
      let GTotal=200;
      let BTotal=150;

class Display {

    constructor(_displaySize, _pixelSize) {
  
      this.displaySize = _displaySize;
      this.pixelSize = _pixelSize;
      this.initColor = color(20, 60, 56);      // black color
      this.displayBuffer = [];
      
      // Assign black to all pixels. Black = off
      for(let i = 0; i < this.displaySize; i++){
        this.displayBuffer[i] = this.initColor;
      }
  
    }
  
     // Color a specific pixel in the buffer
    setPixel(  _index,  _color) {
        this.displayBuffer[_index]  = _color;
    }
  

    // Color all pixels in the buffer
    setAllPixels( _color) {
      
      for(let i = 0; i < displaySize; i++) { 
        display.setPixel(i, _color); 
      }
    }
    showPattern(pattern){
      //print in console "pattern"
      // console.log(pattern);
      //color pixel based on pattern
      
      for (let i = 0; i < pattern.length; i++){
        if(pattern[i].length > 0){
        for(let j=0; j< pattern[i].length; j++){
          
          if(pattern[i][j] == 1){
            R=50;
            G=100;
            B=20;
            
           // display.setPixel(i, color(50, 100, 20));
          }
          else if(pattern[i][j] == 2){
            R=60;
            G=50;
            B=120;
            
           // display.setPixel(i, color(60, 50, 120));
          }
          else if(pattern[i][j] == 3){
            R=200;
            G=100;
            B=20;
           
           // display.setPixel(i, color(200, 100, 20));
          }
          else if(pattern[i][j] == 4){
            R=209;
            G=122;
            B=111; 
            //display.setPixel(i, color(209, 122, 111));
          }
          RTotal=RTotal+R;
          GTotal=GTotal+G;
          BTotal=BTotal+B;
         
        }
        RTotal=RTotal/pattern[i].length;
        GTotal=GTotal/pattern[i].length;
        BTotal=BTotal/pattern[i].length;
      }//end of checking if pattern[i].length > 0
        else{
          RTotal=119;
          GTotal=90;
          BTotal=232;
        }
        
        display.setPixel(i, color(RTotal, GTotal, BTotal));
        //print in console RTotal, GTotal, BTotal
       // console.log(RTotal, GTotal, BTotal);

       /* if (pattern[i].length > 0){
        
         
          if(pattern[i] == 1){
            display.setPixel(i, color(50, 100, 20));
          }
          else if(pattern[i] == 2){
            display.setPixel(i, color(60, 50, 120));
          }
          else if(pattern[i] == 3){
            display.setPixel(i, color(200, 100, 20));
          }
          else if(pattern[i] == 4){
            display.setPixel(i, color(209, 122, 111));
          }


        }
        else{
          display.setPixel(i, color(119, 90, 232));
        }*/
      }
          }
    showSlider(slider){}

    // Now write it to screen
    // This is the only function in the entire software that writes something directly to the screen.
    show() {
      for (let i =0; i< this.displaySize; i++) {
        //noStroke();
        fill(this.displayBuffer[i]);
        rect(i*this.pixelSize,0,this.pixelSize,this.pixelSize);
      }
    }


    
    // Let's empty the display before we start adding things to it again
    clear() {
        for(let i = 0; i < this.displaySize; i++) {    
        this.displayBuffer[i] = this.initColor; 
        }
    }
    

  }