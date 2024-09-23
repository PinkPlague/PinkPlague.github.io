// image demo
// Your Name
// sept 23, 2024


let windowSize = 800

let windowWidth = windowSize
let windowHeight = (windowSize/3)*2

let mrFresh;

function preload() {
  mrFresh = loadImage('assets/textures/mr_fresh.jpg');
}



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(mrFresh,0,0,windowWidth,windowHeight);
}
