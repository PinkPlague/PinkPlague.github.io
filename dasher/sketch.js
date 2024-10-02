let windowDesired;
let winWidth;
let winHeight;

let currentTime;
let lastSavedTime;

let playerSize;
let playerX;
let playerY;
let playerSpeed;
let playerWeight;
let jump = 0;

let playerTopLeftCornerX;
let playerTopLeftCornerY;
let playerBottomLeftCornerX;
let playerBottomLeftCornerY;
let playerTopRightCornerX;
let playerTopRightCornerY;
let playerBottomRightCornerX;
let playerBottomRightCornerY;

let playerSpawnX = 50;
let playerSpawnY = 550;

let onGround;
let groundLevel;

let detect1;
let detect2;

function setup() {
  windowDesired = 600;
  winWidth = windowDesired*2;
  winHeight = winWidth/1.75;
  createCanvas(winWidth, winHeight);

  
  playerSize = 50;
  playerY = playerSpawnY;
  playerX = playerSpawnX;
  playerSpeed = 10;
  playerWeight = 1;
  jump = 0;

  onGround = false;
  groundLevel = winHeight - 90;

  detect1 = 255;
}

function draw() {
  background(220);
  noStroke();


  

  fill(125);
  rect(0,groundLevel, winWidth, winHeight);
  
  playerY -= jump;

  up();
  left();
  right();

  gravity();

  fill(0);
  square(playerX, playerY, playerSize);

  drawKillObject(150, groundLevel+20, 50);
  cornerPos();
  fill(0,0,255);
  circle(playerTopLeftCornerX,playerTopLeftCornerY,10);
  circle(playerBottomLeftCornerX,playerBottomLeftCornerY,10);
  circle(playerTopRightCornerX,playerTopRightCornerY,10);
  circle(playerBottomRightCornerX,playerBottomRightCornerY,10);
}

function drawKillObject(objectX, objectY, objectSize) {
  fill(detect1,detect2,0);
  triangle(objectX,objectY,objectX+objectSize/2,objectY-objectSize,objectX+objectSize,objectY);
  fill(255,0,0);
  square(objectX+objectSize/5*2, objectY-objectSize/2, objectSize/5);
  if(playerX+playerSize >= objectX && playerX <= objectX + objectSize && playerY+playerSize >= objectY-objectSize && playerY <= objectY+objectSize) {
    playerY = playerSpawnY;
    playerX = playerSpawnX;
    detect1 = 255;
    detect2 = 0;
  }
  else {
    detect1 = 0;
    detect2 = 255;
  }
}

function gravity() {
  ground();
  if (playerY+playerSize>=groundLevel) {
    onGround = true;
    jump = 1;
    ground();
  }
}
  
function ground() {
  if (onGround) {
    playerY = groundLevel-playerSize;
  }
  else {
    onGround = false;
    jump -= playerWeight;
  }
}

function up() {
  if (keyIsDown(UP_ARROW) === true) {
    if (onGround) {
      onGround = !onGround;
      jump += 15;
    }
  }
}
function right() {
  if (keyIsDown(RIGHT_ARROW) === true) {
    playerX += playerSpeed;
  }
}
function left() {
  if (keyIsDown(LEFT_ARROW) === true) {
    playerX -= playerSpeed;
  }
}
function cornerPos() {
  playerTopLeftCornerX = playerX;
  playerTopLeftCornerY = playerY;
  playerBottomLeftCornerX = playerX;
  playerBottomLeftCornerY = playerY+playerSize;
  playerTopRightCornerX = playerX+playerSize;
  playerTopRightCornerY = playerY;
  playerBottomRightCornerX = playerX+playerSize;
  playerBottomRightCornerY = playerY+playerSize;
}