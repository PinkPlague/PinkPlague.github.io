// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(220);

  rectMode(CENTER);
  translate(200,200);

  push();
  rotate(angle);
  angle=mouseX;
  fill("red");
  rect(0,0,100);
  pop(); // reset to the push version

  fill("green");
  rect(width/2, height-400, width*2, 400);
}
