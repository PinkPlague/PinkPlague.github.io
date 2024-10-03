let windowDesired;
let winWidth;
let winHeight;

let currentTime;
let lastSavedTime;

let playerTopLeftCornerX;
let playerTopLeftCornerY;
let playerBottomLeftCornerX;
let playerBottomLeftCornerY;
let playerTopRightCornerX;
let playerTopRightCornerY;
let playerBottomRightCornerX;
let playerBottomRightCornerY;

let thePlayer = {
  playerSize: 50,
  playerX: 0,
  playerY: 0,
  playerSpeed: 10,
  playerWeight: 1,
  jump: 0,
  playerSpawnX: 50,
  playerSpawnY: 550,
};

let onGround;
let groundLevel;

let detect1;
let detect2;

function setup() {
  windowDesired = 600;
  winWidth = windowDesired*2;
  winHeight = winWidth/1.75;
  createCanvas(winWidth, winHeight);

  thePlayer.playerY = thePlayer.playerSpawnY;
  thePlayer.playerX = thePlayer.playerSpawnX;

  onGround = false;
  groundLevel = winHeight - 90;

  detect1 = 255;
}

function draw() {
  background(220);
  noStroke();


  

  fill(125);
  rect(0,groundLevel, winWidth, winHeight);
  
  thePlayer.playerY -= thePlayer.jump;

  up();
  left();
  right();

  gravity();

  fill(0);
  square(thePlayer.playerX, thePlayer.playerY, thePlayer.playerSize);

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
  rect(objectX+objectSize/5*2, objectY-objectSize/2-objectSize/8, objectSize/5,objectSize/2.5,);
  if(thePlayer.playerX+thePlayer.playerSize >= objectX && thePlayer.playerX <= objectX + objectSize && thePlayer.playerY+thePlayer.playerSize >= objectY-objectSize && thePlayer.playerY <= objectY+objectSize) {
    thePlayer.playerY = thePlayer.playerSpawnY;
    thePlayer.playerX = thePlayer.playerSpawnX;
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
  if (thePlayer.playerY+thePlayer.playerSize>=groundLevel) {
    onGround = true;
    thePlayer.jump = 1;
    ground();
  }
}
  
function ground() {
  if (onGround) {
    thePlayer.playerY = groundLevel-thePlayer.playerSize;
  }
  else {
    onGround = false;
    thePlayer.jump -= thePlayer.playerWeight;
  }
}

function up() {
  if (keyIsDown(UP_ARROW) === true) {
    if (onGround) {
      onGround = !onGround;
      thePlayer.jump += 15;
    }
  }
}
function right() {
  if (keyIsDown(RIGHT_ARROW) === true) {
    thePlayer.playerX += thePlayer.playerSpeed;
  }
}
function left() {
  if (keyIsDown(LEFT_ARROW) === true) {
    thePlayer.playerX -= thePlayer.playerSpeed;
  }
}
function cornerPos() {
  playerTopLeftCornerX = thePlayer.playerX;
  playerTopLeftCornerY = thePlayer.playerY;
  playerBottomLeftCornerX = thePlayer.playerX;
  playerBottomLeftCornerY = thePlayer.playerY+thePlayer.playerSize;
  playerTopRightCornerX = thePlayer.playerX+thePlayer.playerSize;
  playerTopRightCornerY = thePlayer.playerY;
  playerBottomRightCornerX = thePlayer.playerX+thePlayer.playerSize;
  playerBottomRightCornerY = thePlayer.playerY+thePlayer.playerSize;
}