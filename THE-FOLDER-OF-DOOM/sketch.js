// square that do a move 
// sept 19, 2024

let squareWidth = 50
let w = 400
let h = 400
let squareX = w/2-squareWidth/2
let squareY = h/2-squareWidth/2
let moveSpeed = 2

function left() {
  if (keyIsDown(LEFT_ARROW) === true) {
    squareX -= moveSpeed;
  }
}
function right() {
  if (keyIsDown(RIGHT_ARROW) === true) {
    squareX += moveSpeed;
  }
}
function up() {
  if (keyIsDown(UP_ARROW) === true) {
    squareY -= moveSpeed;
  }
}
function down() {
  if (keyIsDown(DOWN_ARROW) === true) {
    squareY += moveSpeed;
  }
}

function setup() {
  createCanvas(w, h);
}

function draw() {
  background(200);
  fill('red')
  square(squareX,squareY,squareWidth)
  left()
  right()
  up()
  down()
}