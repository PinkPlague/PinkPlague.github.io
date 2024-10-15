// array and object notation assignment

const GAME_LENGTH = 5000;
let bulletDelay = 750;
let bulletArray = [];

let lastSavedTime = 0;


let thePlayer = {
  playerSize: 50,
  playerX: 0,
  playerY: 0,
  playerSpeed: 6.5,
  playerWeight: 0.5,
  jump: 0,
};


let score = false;

let onGround;
let groundLevel;


function setup() {
  createCanvas(windowWidth, windowHeight);

  thePlayer.playerY = height - (90 + thePlayer.playerSize);
  thePlayer.playerX = width/2-thePlayer.playerSize;

  onGround = false;
  groundLevel = height - 90;

  window.setInterval(makeBullet, 500);
}

function draw() {
  background(220);

  fill(125);
  rect(0,groundLevel, width, height);
  
  thePlayer.playerY -= thePlayer.jump;

  up();
  left();
  right();

  gravity();

  fill(0);
  stroke(255,0,255);
  strokeWeight(4);
  square(thePlayer.playerX, thePlayer.playerY, thePlayer.playerSize);
  noStroke();




  fill(255);
  stroke(0);

  for (let theBullet of bulletArray) {
    theBullet.x += theBullet.dx;
    theBullet.y += theBullet.dy;

    //bounce if needed
    if (theBullet.x+theBullet.r>=width||theBullet.x-theBullet.r<=0) {
      theBullet.dx *=-1;
    }
    if (theBullet.y+theBullet.r>=groundLevel||theBullet.y-theBullet.r<=0) {
      theBullet.dy *=-1;
    }
    if (bulletCollision(theBullet) === true) {
      background("yellow");
    }

    circle(theBullet.x,theBullet.y,theBullet.r*2);
  }
}



function makeBullet() {
  let bullet;

  bullet = {
    x: random(100,width-100),
    y: 50,
    r: 10,
    dx: random(-6,7),
    dy: random(3,6),
  };
  bulletArray.push(bullet);
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
      thePlayer.jump += 20;
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

function bulletCollision(someBullet) {
  let collide = false;
  if (
    someBullet.x + someBullet.r > thePlayer.x && // right edge of circle > left edge of rectangle
    someBullet.x - someBullet.r < thePlayer.x + thePlayer.playerSize && // left edge of circle < right edge of rectangle
    someBullet.y + someBullet.r > thePlayer.playerY && // bottom edge of circle > top edge of rectangle
    someBullet.y - someBullet.r < thePlayer.playerY + thePlayer.playerSize
  ) {
    if (someBullet.y + someBullet.r > thePlayer.playerY && someBullet.y < thePlayer.playerY) {
      // circle hit top edge of rectangle
      score = true;
    }
    collide = true;
  }
  else {
    // no collision
    collide = false;
    score = false;
  }
  
  console.log(collide);
  return collide;
}