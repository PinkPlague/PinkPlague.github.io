// // timing vars // //
let redLength = 2000;
let yellowLength = 1250;
let greenLength = 3000;
let lastSavedTime = 0;
// // /////////// // //
// // states // //
let redState = true;
let yellowState = false;
let greenState = false;
// // ////// // //



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawOutlineOfLights();

  if (redState) {
    redLight();
  }
  if (yellowState) {
    yellowLight();
  }
  if (greenState) {
    greenLight();
  }
}

function redLight() {
  if ((millis() > lastSavedTime + redLength && millis() < redLength + yellowLength + lastSavedTime)) {
    redState = !redState;
    greenState = !greenState;
    lastSavedTime = millis();
  }
}

function yellowLight() {
  if ((millis() > lastSavedTime + yellowLength && millis() < yellowLength + greenLength + lastSavedTime)) {
    yellowState = !yellowState;
    redState = !redState;
    lastSavedTime = millis();
  }
}

function greenLight() {
  if ((millis() > lastSavedTime + greenLength && millis() < greenLength + redLength + lastSavedTime)) {
    greenState = !greenState;
    yellowState = !yellowState;
    lastSavedTime = millis();
  }
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(25);
  if (redState) {
    fill(225,0,0)
  } else {
    fill(25);
  }
  ellipse(width/2, height/2 - 65, 50, 50); //top
  if (yellowState) {
    fill(255,255,0)
  } else {
    fill(25);
  }
  ellipse(width/2, height/2, 50, 50); //middle
  if (greenState) {
    fill(0,225,0)
  } else {
    fill(25);
  }
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}