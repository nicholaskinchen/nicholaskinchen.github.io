$(document).ready(function(){
    //////////////////////////////////////////////////////////////////
    /////////////////// Setup ///////////////////////////////
    //////////////////////////////////////////////////////////////////
    
    var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen
    var BOARD_HEIGHT = $(window).height();
    var positionX = 0;
    var positionY = 0;
    var speedX = 10;
    var speedY = 10;
    var points = 0;
    
    // Every 50 milliseconds, call the update Function (see below)
    setInterval(update, 50);
  
    // Every time the box is clicked, call the handleBoxClick Function (see below)
    $('#box').on('click', handleBoxClick);
    
    //////////////////////////////////////////////////////////////////
    /////////////////// Core Logic ///////////////////////////////
    //////////////////////////////////////////////////////////////////
    
    /* 
      This Function will be called 20 times/second. Each time it is called,
      it should move the Box to a new location. If the box drifts off the screen
      turn it around! 
  */
    function update() {
      repositionBox();
      checkForWallBounce();
    }
  
    /* 
      This Function will be called each time the box is clicked. Each time it is called,
      it should increase the points total, increase the speed, and move the box to
      the left side of the screen.
    */
    function handleBoxClick() {
     increasePoints();
     increaseSpeed();
     resetPosition();
     changeBoxColor();
    }
    
    //////////////////////////////////////////////////////////////////
    /////////////////// Helper Functions ///////////////////////////////
    //////////////////////////////////////////////////////////////////
  
    function repositionBox() {
      positionX += speedX;    // update the location of the box
      $('#box').css("left", positionX);
      
      positionY += speedY;
      $('#box').css("top", positionY);
    }
    
    function checkForWallBounce() {
      //bounce the box back
      if (positionX > BOARD_WIDTH) {
        speedX = -speedX;
      }
      else if (positionX < 0) {
        speedX = -speedX;
      }
      
      if (positionY > BOARD_HEIGHT) {
        speedY = -speedY;
      }
      else if (positionY < 0) {
        speedY = -speedY;
      }
      
    }
    
    function increasePoints() {
      points += 1;
      $('#box').text(points);
    }
    
    function increaseSpeed() {
      if (speedX >= 0) {
        speedX += 3;
      } 
      else if (speedX < 0) {
        speedX -= 3;
      }
      if (speedY >= 0) {
        speedY += 3;
      } 
      else if (speedY < 0) {
        speedY -= 3;
      }
    }
    
    function resetPosition() {
      positionX = 0;
    }
    function changeBoxColor() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      
      
      var rgbString = "rgb(" + r + "," + g + "," + b + ")";
  
      $("#box").css("background-color", rgbString)
    }
    
    
    
   
  
  
  }); // DO NOT DELETE THIS LINE OF CODE. ALL JAVASCRIPT ABOVE HERE
  