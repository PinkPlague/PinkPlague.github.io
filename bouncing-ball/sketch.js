// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i =0; i < 10; i++) {
    spawnBall(width/2,height/2);
  }
}

function draw() {
  background(220);

  for (let someBall of ballArray) {
  //move ball
    someBall.x += someBall.dx;
    someBall.y += someBall.dy;

    //bounce if needed
    if (someBall.x+someBall.radius>=width||someBall.x-someBall.radius<=0) {
      someBall.dx *=-1;
    }
    if (someBall.y+someBall.radius>=height||someBall.y-someBall.radius<=0) {
      someBall.dy *=-1;
    }

    //display ball
    noStroke();
    fill(someBall.red,someBall.green,someBall.blue,someBall.alpha);
    circle(someBall.x,someBall.y,someBall.radius*2);
  }
}

function mousePressed() {
  spawnBall(mouseX, mouseY);
}

function spawnBall(theX,theY) {
  let theBall = {
    x: theX,
    y: theY,
    radius:75,
    dx: round(random(-10,11)),
    dy: round(random(-10,11)),
    red: round(random(0,256)),
    green: round(random(0,256)),
    blue: round(random(0,256)),
    alpha: round(random(150,256)),
  };
  ballArray.push(theBall);
}