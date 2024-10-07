let windowDesired;
let winWidth;
let winHeight;

let currentTime;
let lastSavedTime;

let thePlayer = {
  playerSize: 50,
  playerX: 0,
  playerY: 0,
  playerSpeed: 6.5,
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
  currentTime = millis();


  

  fill(125);
  rect(0,groundLevel, winWidth, winHeight);
  
  thePlayer.playerY -= thePlayer.jump;

  up();
  left();
  right();

  gravity();

  drawKillObject(150, groundLevel, 50);
  drawKillObject(200, groundLevel, 50);
  drawKillObject(250, groundLevel, 50);

  fill(0);
  stroke(255,0,255);
  strokeWeight(4);
  square(thePlayer.playerX, thePlayer.playerY, thePlayer.playerSize);
  noStroke();

  
}

function drawKillObject(objectX, objectY, objectSize) {
  let killBox = {
    x: objectX+objectSize/5*2,
    y: objectY-objectSize/2-objectSize/8,
    w: objectSize/5,
    h: objectSize/2.5,
  };
  let spike = {
    x1: objectX,
    y1: objectY,
    x2: objectX+objectSize/2,
    y2: objectY-objectSize,
    x3: objectX+objectSize,
    y3: objectY,
  };
  stroke("white");
  strokeWeight(3);
  fill(0);
  triangle(spike.x1,spike.y1,spike.x2,spike.y2,spike.x3,spike.y3);
  noStroke();
  fill(255,0,0);
  rect(killBox.x, killBox.y, killBox.w, killBox.h);
  if(thePlayer.playerX+thePlayer.playerSize >= killBox.x && thePlayer.playerX <= killBox.x + killBox.w && thePlayer.playerY+thePlayer.playerSize >= killBox.y+killBox.h && thePlayer.playerY <= killBox.y) {
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
