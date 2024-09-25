// // timing vars // //
let redLength = 2000;
let yellowLength = 1250;
let greenLength = 3000;
let lastSavedTime = 0;
// // /////////// // //
// // states // //
let lightState = "red";
// // ////// // //



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawOutlineOfLights();
  trafficLight();
}

function trafficLight() {
  if (lightState === "red") {
    redLight();
  }
  if (lightState === "yellow") {
    yellowLight();
  }
  if (lightState === "green") {
    greenLight();
  }
}

function redLight() {
  if (millis() > lastSavedTime + redLength && millis() < redLength + yellowLength + lastSavedTime) {
    lightState = "yellow";
    lastSavedTime = millis();
  }
}

function yellowLight() {
  if (millis() > lastSavedTime + yellowLength && millis() < yellowLength + greenLength + lastSavedTime) {
    lightState = "green";
    lastSavedTime = millis();
  }
}

function greenLight() {
  if (millis() > lastSavedTime + greenLength && millis() < greenLength + redLength + lastSavedTime) {
    lightState = "red";
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
  if (lightState === "red") {
    fill(225,0,0);
  }
  else {
    fill(25);
  }
  ellipse(width/2, height/2 - 65, 50, 50); //top
  if (lightState === "yellow") {
    fill(255,255,0);
  }
  else {
    fill(25);
  }
  ellipse(width/2, height/2, 50, 50); //middle
  if (lightState === "green") {
    fill(0,225,0);
  }
  else {
    fill(25);
  }
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}