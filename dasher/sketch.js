let windowDesired;
let winWidth;
let winHeight;

let playerSize;
let playerX;
let playerY;
let playerSpeed;
let playerWeight;

let onGround;

function setup() {
  windowDesired = 600;
  winWidth = windowDesired*2;
  winHeight = winWidth/1.75;
  createCanvas(winWidth, winHeight);

  
  playerSize = 50;
  playerY = 300;
  playerX = 0;
  playerSpeed = 10;
  playerWeight = 5;

  onGround = true;
}

function draw() {
  background(220);




  up();
  // down();
  left();
  right();

  gravity();

  fill(0);
  square(playerX, playerY, playerSize);
}


function gravity() {
  if (playerY+playerSize>=winHeight) {
    onGround = true;
    playerY = winHeight - playerSize;
  }
  else {
    onGround = false;
  }
  if (!onGround) {
    playerY += playerWeight;
  }
}
function left() {
  if (keyIsDown(LEFT_ARROW) === true) {
    playerX -= playerSpeed;
  }
}
function right() {
  if (keyIsDown(RIGHT_ARROW) === true) {
    playerX += playerSpeed;
  }
}
function up() {
  if (keyIsDown(UP_ARROW) === true) {
    playerY -= playerSpeed;
  }
}
// function down() {
//   if (keyIsDown(DOWN_ARROW) === true) {
//     playerY += playerSpeed;
//   }
// }