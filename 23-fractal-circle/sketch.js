// Fractal circle demo
// using recursion



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  recursiveCircle(width/2,height/2,width/4);
}

function recursiveCircle(x,y,radius) {
  circle(x,y,radius*2);

  // exit
  if (radius > 1) {
    recursiveCircle(x - radius/2, y, radius/2);
    recursiveCircle(x + radius/2, y, radius/2);
  }

}