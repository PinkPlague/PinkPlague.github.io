
let windowSize = 600;


let currentTime;
let lastSavedTime;
let chance;
let direction;


// // screen //
let h = windowSize/2;
let w = windowSize;
// // ////// //

let bitFont;
let harharhar;
let rare = false;

function preload() {
  harharhar = loadImage("assets/images/harharharharharharharhar.png");
  bitFont = "assets/fonts/bitFont.ttf";
}


// // pause/start states // //
let starting = true;
let pause = false;
// // ////////////////// // //


// // score variables // //
let p1Score = 0;
let p2Score = 0;
// // /////////////// // //


function win() {
  if (p1Score>=5||p2Score>=5) {
    starting = true;
    p1Score = 0;
    p2Score = 0;
  }
}


// // ball variables & functions // //
let radius = 15;
let masterSpeed = 4;
let dx = masterSpeed;
let dy = dx/1.5;
let ballX = w/2;
let ballY = h/2;
function resetBallPos() {
  ballX = w/2;
  ballY = h/2;
}
// // ////////////////////////// // //




// //////// paddle 1 variables ////////
let paddleDist = 60;
let paddleHeight = 100;
let paddleWidth = 20;
let paddle1Y = h/2-paddleHeight/2;
let paddle1X = w-paddleDist;
let paddleSpeed = 2;
// /////////////////////////////////

// ///////////// paddle 1 colliders //////////////
// top collider //
let topCollider1 = paddle1Y;
// bottom collider //
let bottomCollider1 = paddle1Y+paddleHeight;
// //////////////////////////////////////////////


// //////// paddle 2 variables ////////
let paddle2Y = h/2-paddleHeight/2;
let paddle2X = paddleDist-paddleWidth/2;
// /////////////////////////////////


// ///////////// paddle 2 colliders //////////////
// top collider //
let topCollider2 = paddle2Y;
// bottom collider //
let bottomCollider2 = paddle2Y+paddleHeight;
// //////////////////////////////////////////////


function paddleInput() {
  if (keyIsDown(UP_ARROW) === true) {
    paddle1Y -= paddleSpeed;
    topCollider1 -= paddleSpeed;
    bottomCollider1 -= paddleSpeed;
  }
  if (keyIsDown(DOWN_ARROW) === true) {
    paddle1Y += paddleSpeed;
    topCollider1 += paddleSpeed;
    bottomCollider1 += paddleSpeed;
  }
  if (keyIsDown(87) === true) {
    paddle2Y -= paddleSpeed;
    topCollider2 -= paddleSpeed;
    bottomCollider2 -= paddleSpeed;
  }
  if (keyIsDown(83) === true) {
    paddle2Y += paddleSpeed;
    topCollider2 += paddleSpeed;
    bottomCollider2 += paddleSpeed;
  }
}
function ballMove() {
  // move ballX
  if (direction < 50) {
    ballX += dx;
  }
  else {
    ballX -= dx;
  }
  if (ballX>=width-radius||ballX<=0+radius) {
    dx = dx*0;
    dy = 0;
  }
  // move ballY
  ballY = ballY+dy;
  if (ballY>=height-radius||ballY<=0+radius) {
    dy = dy*-1;
  }
}
function p1CollisionDetect() {
  if (ballX + radius >= paddle1X&&(ballY+radius >= topCollider1&&ballY-radius <= bottomCollider1)) {
    if (ballX >= paddle1X) {
      ballX = ballX - 40;
    }
    dx += 0.5;
    dx = dx * -1;
  }
}
function p2CollisionDetect() {
  if (ballX - radius <= paddle2X+paddleWidth&&(ballY+radius >= topCollider2&&ballY-radius <= bottomCollider2)) {
    if (ballX <= paddleDist+paddleWidth) {
      ballX = ballX + 30;
    }
    dx += 0.5;
    dx = dx * -1;
  }
}
function entityFunctions() {
  // movement
  ballMove();
  paddleInput();
  // collision
  p1CollisionDetect();
  p2CollisionDetect();
}



function drawElements() {
  circle(ballX,ballY,radius*2);
  rect(paddle1X, paddle1Y, paddleWidth, paddleHeight);
  rect(paddle2X, paddle2Y, paddleWidth, paddleHeight);
  textSize(30);
  textFont(bitFont);
  text(p1Score, w-35, 50);
  text(p2Score, 20, 50);
  fill(255);
}
function pauseText() {
  resetBallPos();
  if (starting) {
    text("press space to begin", w/4+15, h-h/3);
  }
  else if (rare) {
    image(harharhar,0,0,w,h);
  }
  else {
    text("press space to restart", w/4+15, h-h/3);
  }
  if (keyIsDown(32) === true) {
    dx = masterSpeed;
    dy = dx/1.5;
    pause = false;
    starting = false;
    rare = false;
    direction = random(100);
  }
}
function score() {
  if (ballX<=0+radius) {
    ignoreThisPlease();
    p1Score += 1;
    pause = true;

  }
  if (ballX>=width-radius) {
    ignoreThisPlease();
    p2Score += 1;
    pause = true;
  }
}
function ignoreThisPlease() {
  chance = round(random(0,1));
  if (chance === 1) {
    rare = true;
  }
}


function setup() {
  createCanvas(w, h);
  //frameRate(360)
}

function draw() {
  background(0);
  fill(255);
  textSize(30);
  textFont(bitFont);
  win();
  score();
  entityFunctions();

  if (pause) {
    pauseText();
  }
  if (starting) {
    pauseText();
  }
  
  // // draw elements // //
  if (!rare) {
    drawElements();
  }
  // // ///////////// // //
}