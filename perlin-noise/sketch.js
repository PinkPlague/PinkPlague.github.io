// Perlin noise ball demo

let x;
let y;
let someTime = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);

  x = noise(someTime) * width;
  y = noise(someTime+1000) * height;


  circle(x,y,50);

  someTime += 0.01;
}
