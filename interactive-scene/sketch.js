// / screen /
let h = 300
let w = 600
// //////////

let bitFont

function preload() {
  bitFont = ('assets/fonts/bitFont.ttf')
}



let starting = true
let pause = false


// // score variables // //
let p1Score = 0
let p2Score = 0
// // /////////////// // //


// // ball variables & functions // //
let radius = 15
let masterSpeed = 4
let dx = masterSpeed
let dy = dx/1.5
let ballX = w/2
let ballY = h/2
function resetBallPos() {
  ballX = w/2
  ballY = h/2
}
// // ////////////////////////// // //




// //////// paddle 1 variables ////////
let paddleDist = 60
let paddleHeight = 100
let paddleWidth = 20
let paddle1Y = (h/2)-(paddleHeight/2)
let paddle1X = (w-paddleDist)
let paddleSpeed = 4
// /////////////////////////////////


// ///////////// paddle 1 colliders //////////////
// top collider //
let topCollider1 = paddle1Y
// bottom collider //
let bottomCollider1 = paddle1Y+paddleHeight
// //////////////////////////////////////////////


// //////// paddle 2 variables ////////
let paddle2Y = (h/2)-(paddleHeight/2)
let paddle2X = (paddleDist-paddleWidth/2)
// /////////////////////////////////


// ///////////// paddle 2 colliders //////////////
// top collider //
let topCollider2 = paddle2Y
// bottom collider //
let bottomCollider2 = paddle2Y+paddleHeight
// //////////////////////////////////////////////




// ////////// movement keys //////////
// //// P1 up key ////
function p1Up() {
  if (keyIsDown(UP_ARROW) === true) {
    paddle1Y -= paddleSpeed;
    topCollider1 -= paddleSpeed;
    bottomCollider1 -= paddleSpeed;
  }
}
// //// P1 down key ////
function p1Down() {
  if (keyIsDown(DOWN_ARROW) === true) {
    paddle1Y += paddleSpeed;
    topCollider1 += paddleSpeed;
    bottomCollider1 += paddleSpeed;
  }
}
// //// P2 up key ////
function p2Up() {
  if (keyIsDown(87) === true) {
    paddle2Y -= paddleSpeed;
    topCollider2 -= paddleSpeed;
    bottomCollider2 -= paddleSpeed;
  }
}
// //// P2 down key ////
function p2Down() {
  if (keyIsDown(83) === true) {
    paddle2Y += paddleSpeed;
    topCollider2 += paddleSpeed;
    bottomCollider2 += paddleSpeed;
  }
}
// ///////////////////////////////////


// //////////////// ball movement ////////////////
function ballMove() {
  // move ballX
  ballX = ballX+dx;
  if ((ballX>=width-radius)||(ballX<=0+radius)) {
    dx = dx*0;
    dy = 0;
  }
  // move ballY
  ballY = ballY+dy;
  if ((ballY>=height-radius)||(ballY<=0+radius)) {
    dy = dy*-1;
  }
}
// /////////////////////////////////////////////


// ////////////// collision detection ////////////////
function p1CollisionDetect() {
  if (((ballX + radius) >= paddle1X)&&((ballY+radius) >= topCollider1&&(ballY-radius) <= bottomCollider1)) {
    if (ballX > paddle1X-5) {
      ballX = ballX - 40;
    }
    dx += 0.5
    dx = dx * -1;
  }
}
function p2CollisionDetect() {
  if (((ballX - radius) <= (paddle2X+paddleWidth))&&((ballY+radius) >= topCollider2&&(ballY-radius) <= bottomCollider2)) {
    if (ballX < paddleDist+paddleWidth) {
      ballX = ballX + 30;
    }
    dx += 0.5
    dx = dx * -1;
  }
}
// ///////////////////////////////////////////////////


// ////// draw elements //////
function drawElements() {
  circle(ballX,ballY,radius*2);
  rect(paddle1X, paddle1Y, paddleWidth, paddleHeight)
  rect(paddle2X, paddle2Y, paddleWidth, paddleHeight)
  textSize(30);
  textFont(bitFont);
  text(p1Score, w-35, 50)
  text(p2Score, 20, 50)
  fill(255)
}
// ////// ///////////// //////


// //// pauseText //// //
function pauseText() {
  resetBallPos()
  if (starting) {
    text('press space to begin', w/4+15, h-h/3)
  }
  else {
    text('press space to restart', w/4+15, h-h/3)
  }
  if (keyIsDown(32) === true) {
    dx = masterSpeed
    dy = dx/1.5
    pause = false
    starting = false
  }
}




// ////// score ////// //
function score() {
  if (ballX<=0+radius) {
    p1Score += 1
    pause = true
  }
  if (ballX>=width-radius) {
    p2Score += 1
    pause = true
  }
}
// ////// ///// ////// //


function setup() {
  createCanvas(w, h);
  frameRate(360)
}

function draw() {
  background(0);
  fill(255)
  textSize(30)
  textFont(bitFont);

  
  if (pause) {
    pauseText()
  }
  if (starting) {
    pauseText()
  }
  
  
  // // draw elements // //
  drawElements()
  // // ///////////// // //
  
  
  // // movements // //
  // move ball
  ballMove()
  // move paddles
  p1Up()
  p1Down()
  p2Up()
  p2Down()
  // // ///////// // //
  
  
  // // collisions // // 
  p1CollisionDetect()
  p2CollisionDetect()
  // // ////////// // //
  
  // // score // //
  score()
  // // ///// // //
  
  
}