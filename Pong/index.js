/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()


  
function runProgram(){
  $("#a1").hide();
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var BOARD_WIDTH = $('#board').width(); // Number: the maximum X-Coordinate of the screen
  var BOARD_HEIGHT = $('#board').height();
  var KEY = {
    "W": 87,
    "S": 83,
    "UP": 38,
    "DOWN": 40,
  }
  var scorePlayer1 = 0;
  var scorePlayer2 = 0;
  
  // Game Item Objects
  function GameItem(y, x, speedY, speedX, id) {
    var item = {  
      y: y,
      x: x,
      speedY: speedY,
      speedX: speedX,
      id: id,
      w: $(id).width(),
      h: $(id).height(),
    }
    return item;
  }
  var paddleLeft = GameItem(175, 10, 0, 0, "#leftPaddle");
  var paddleRight = GameItem(175, BOARD_WIDTH - 20, 0, 0, "#rightPaddle");
  var ball = GameItem(BOARD_HEIGHT / 2, BOARD_WIDTH / 2, ((Math.random() > 0.5) ? -3 : 3), ((Math.random() > 0.5) ? -3 :3), "#theBall");
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    updatePosition(paddleLeft);
    updatePosition(paddleRight);
    redrawGameItem(paddleLeft);
    redrawGameItem(paddleRight);
    redrawGameItem(ball);
    updatePosition(ball);
    checkForWall();
    drawScore();
    ballHittingPaddle();
    checkEndGame();

    

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.DOWN) {
      paddleRight.speedY = 7;
    }
    if (event.which === KEY.UP) {
      paddleRight.speedY = -7;
    }
    if (event.which === KEY.W) {
      paddleLeft.speedY = -7;
    }
    if (event.which === KEY.S) {
      paddleLeft.speedY = 7;
    }

  }
  function handleKeyUp(event) {
    if (event.which === KEY.DOWN) {
      paddleRight.speedY = 0;
    }
    if (event.which === KEY.UP) {
      paddleRight.speedY = 0;
    }
    if (event.which === KEY.W) {
      paddleLeft.speedY = 0;
    }
    if (event.which === KEY.S) {
      paddleLeft.speedY = 0;
    }

  }
  

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function doCollide(obj1, obj2) {
    
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.rightX = obj1.leftX + $(obj1.id).width();
    obj1.bottomY = obj1.y + $(obj1.id).height();
    
    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.leftX + $(obj2.id).width();
    obj2.bottomY = obj2.y + $(obj2.id).height();
    
	if ((obj1.rightX > obj2.leftX) &&
      (obj1.leftX < obj2.rightX) &&
      (obj1.bottomY > obj2.topY) &&
      (obj1.topY < obj2.bottomY)) {
       return true;
      
     }else {
      return false;
    }
  
  
  
		
}



function drawScore() {
  $("#scorePlayer1").text(scorePlayer1);
  $("#scorePlayer2").text(scorePlayer2);
}







function updatePosition(player) {
  player.y += player.speedY;
  player.x += player.speedX;
}

function redrawGameItem(player) {
  $(player.id).css("left", player.x);
  $(player.id).css("top", player.y);
}

function checkForWall() {
  //bounce the ball back
  if (ball.x > BOARD_WIDTH - ball.w) {
    scorePlayer1 = scorePlayer1 + 1 ;
    
    ball = GameItem(BOARD_HEIGHT / 2, BOARD_WIDTH / 2, ((Math.random() > 0.5) ? -3 : 3), ((Math.random() > 0.5) ? -3 :3), "#theBall");
  }
  if (ball.x < 0) {
    scorePlayer2 = scorePlayer2 + 1;
    
    ball = GameItem(BOARD_HEIGHT / 2, BOARD_WIDTH / 2, ((Math.random() > 0.5) ? -3 : 3), ((Math.random() > 0.5) ? -3 :3), "#theBall");
  }
  
  if (ball.y > BOARD_HEIGHT - ball.h) {
    ball.speedY = -ball.speedY; 
  }
  if (ball.y < 0) {
    ball.speedY = -ball.speedY;
  }
  if (paddleLeft.y < 0) {
    paddleLeft.y = 0;
  }
  if (paddleLeft.y > BOARD_HEIGHT - paddleLeft.h) {
    paddleLeft.y = BOARD_HEIGHT - paddleLeft.h;
  }
  if (paddleRight.y > BOARD_HEIGHT - paddleRight.h)  {
    paddleRight.y = BOARD_HEIGHT - paddleRight.h;
  }
  if (paddleRight.y < 0) {
    paddleRight.y = 0;
  }
}

function ballHittingPaddle() {
  if (doCollide(paddleRight, ball)){
    ball.speedX = -ball.speedX;
    changeBallSpeed();
  }

  if (doCollide(paddleLeft, ball)){
    ball.speedX = -ball.speedX;
    changeBallSpeed();
  }
}

function changeBallSpeed() {
  if (ball.speedX >= 0) {
    ball.speedX = ball.speedX + 0.5;
  }
  else {
    ball.speedX = ball.speedX - 0.5;
  }
  if (ball.speedY >= 0) {
    ball.speedY = ball.speedY + 0.5;
  }
  else {
    ball.speedY = ball.speedY - 0.5;
  }
}

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function checkEndGame() {
    if (scorePlayer1 === 10) {
      endGame();
      $("#a1").show();
      
    }
    if (scorePlayer2 === 10) {
      endGame();
      $("#a1").show();
    }
  }


  
}