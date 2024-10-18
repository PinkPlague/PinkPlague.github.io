// array and object notation assignment

const GAME_LENGTH = 5000;
const WEIGHT = 0.25;
const MAX_BULLETS = 30;
let bulletDelay;
let bulletArray = [];

let lastSavedTime = 0;


let thePlayer;

let slam = false;
let gameOverBoolean = false;

let score = 0;

let objectNum = 0;

let onGround;
let groundLevel;


function scoreText() {
  if (!gameOverBoolean) {
    textSize(30);
    text("Score: " + score, 20, 50);
    text("Bullets: " + objectNum + "/" + MAX_BULLETS, 20, 100);
    text("Delay: " + round(bulletDelay/1000,1) + "seconds", 20, 150);
  }
}

function gameOverMenu() {
  textSize(40);
  textAlign(CENTER);
  fill("red");
  text("💀 You Let Too Many Enemies Spawn! 💀", width/2, height/2-100);
  text("X_X", width/2, height/2-50);
  fill(255);
  textSize(25);
  text("Refresh to play again.",width/2,height/2);
}

function gameOver() {
  if (gameOverBoolean) {
    thePlayer.playerSpeed=0;
    bulletArray = [];
    objectNum = 0;
    gameOverMenu();
  }
}

function gameplay() {
  scoreText();
  fill(125);
  rect(0,groundLevel, width, height);
  fill(0);
  stroke(255,0,255);
  strokeWeight(4);
  if (!gameOverBoolean) {
    square(thePlayer.playerX, thePlayer.playerY, thePlayer.playerSize);
  }
  if (objectNum >= MAX_BULLETS) {
    gameOverBoolean = true;
  }
}

function playerMovement() {
  up();
  down();
  left();
  right();
  thePlayer.playerY -= thePlayer.jump;
  gravity();
  groundSlam();
}

function projectileFunctions() {
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
    
    collided(theBullet);

    if (!gameOverBoolean) {
      circle(theBullet.x,theBullet.y,theBullet.r*2);
    }
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  bulletDelay = round(random(750, 1500));

  thePlayer = {
    playerSize: 50,
    playerX: 0,
    playerY: 0,
    playerSpeed: 8,
    playerWeight: 0.25,
    jump: 0,
  };

  thePlayer.playerY = height - (90 + thePlayer.playerSize);
  thePlayer.playerX = width/2-thePlayer.playerSize;

  onGround = false;
  groundLevel = height - 90;

  window.setInterval(makeBullet, 1000);
}

function draw() {
  background(220);
  scoreText();
  
  gameOver();

  playerMovement();

  gameBounds();

  gameplay();

  projectileFunctions();
}



function makeBullet() {
  if (!gameOverBoolean) {
    let bullet;
  
    bullet = {
      x: random(100,width-100),
      y: 50,
      r: 15,
      dx: random(-6,7),
      dy: random(3,6),
    };
    objectNum += 1;
    bulletArray.push(bullet);
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
    slam = false;
  }
  else {
    onGround = false;
    thePlayer.jump -= thePlayer.playerWeight;
  }
}

function groundSlam() {
  if (slam) {
    if (thePlayer.playerWeight <= 2) {
      thePlayer.playerWeight += 0.25;
    }
  }
  else {
    thePlayer.playerWeight = WEIGHT;
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
function down() {
  if (keyIsDown(DOWN_ARROW) === true) {
    if (!onGround) {
      slam = true;
    }
    else {
      slam = false;
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

function collided() {
  for (let bullet of bulletArray) {
    if (hasCollided(thePlayer.playerX + thePlayer.playerSize/2, thePlayer.playerY + thePlayer.playerSize/2, bullet)) {
      let theIndex = bulletArray.indexOf(bullet);
      bulletArray.splice(theIndex, 1);
      score += 1;
      objectNum -= 1;
      console.log(score);
    }
  }
}

function hasCollided(x,y,someBullet) {
  let distanceAway = dist(x,y,someBullet.x,someBullet.y);
  return distanceAway < someBullet.r + thePlayer.playerSize/2;
}

function gameBounds() {
  if (thePlayer.playerX + thePlayer.playerSize < 0) {
    thePlayer.playerX = width + 5;
  }
  else if (thePlayer.playerX > width) {
    thePlayer.playerX = -thePlayer.playerSize - 5;
  }
}