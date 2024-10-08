// array and object notation assignment

const GAME_LENGTH = 60000;
const BULLET_SIZE = 10;
let bulletDelay;
let bulletArray = [];

let delay = 500;

let lastSavedTime;


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let time = 0; time <= GAME_LENGTH; time += delay) {
    let someBullet = makeBullet();
    bulletArray.push(someBullet);
    // delay = round(random(500,1750));
  }
}

function draw() {
  background(220);

  for (let theBullet of bulletArray) {
    theBullet.x += theBullet.dx;
    theBullet.y += theBullet.dy;

    //bounce if needed
    if (theBullet.x+BULLET_SIZE*2>=width||theBullet.x-BULLET_SIZE*2<=0) {
      theBullet.dx *=-1;
    }
    if (theBullet.y+BULLET_SIZE*2>=height||theBullet.y-BULLET_SIZE*2<=0) {
      theBullet.dy *=-1;
    }


    circle(theBullet.x,theBullet.y,BULLET_SIZE*2);
  }
}

function makeBullet() {
  let bullet;

  bullet = {
    x: random(100,width-100),
    y: 50,
    dx: random(3,8),
    dy: random(3,8),
  };
  bulletArray.push(bullet);
  
}