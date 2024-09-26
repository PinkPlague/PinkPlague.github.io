let windowDesired;
let winWidth;
let winHeight;

let playerSize;
let playerX;
let playerY;
let playerSpeed;
let playerWeight;
let jump = 0;

let onGround;

let detect;

function setup() {
  windowDesired = 600;
  winWidth = windowDesired*2;
  winHeight = winWidth/1.75;
  createCanvas(winWidth, winHeight);

  
  playerSize = 50;
  playerY = 300;
  playerX = 50;
  playerSpeed = 10;
  playerWeight = 1;
  jump = 0;

  onGround = false;

  detect = 255;
}

function draw() {
  background(220);

  
  playerY -= jump;

  up();
  // down();
  left();
  right();

  gravity();

  fill(0);
  square(playerX, playerY, playerSize);


  fill(detect);
  square(150, 500, 100)



  if(playerX+playerSize >= 150 && playerX <= (150 + 100) && playerY+playerSize >= 500 && playerY <= (600 + 100)) {
    detect = 0;
  }
  else {
    detect = 255;
  }
}


function gravity() {
  if (playerY+playerSize>=winHeight-100) {
    onGround = true;
    playerY = winHeight - playerSize-100;
    jump = 1;
  } else {
    onGround = false;
  }
  if (!onGround) {
    // playerY += playerWeight;
    jump -= playerWeight
  }
}
function up() {
  if (keyIsDown(UP_ARROW) === true) {
    if (onGround) {
      jump += 15
    }
  }
}
function right() {
  if (keyIsDown(RIGHT_ARROW) === true) {
    playerX += 2;
  }
}
function left() {
  if (keyIsDown(LEFT_ARROW) === true) {
    playerX -= 2;
  }
}