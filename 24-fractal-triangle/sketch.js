// Sierpinski triangle
// using recusrion

let initialTriangle = [
  {x: 500, y: 50},
  {x: 50, y: 800},
  {x: 950, y: 800},
];

let theDepth = 0;

let theColour;

function setup() {
  createCanvas(windowWidth, windowHeight);
  theColour = color(random(255),random(255),random(255));
}

function draw() {
  background(220);

  sierpinskiTriangle(initialTriangle, theDepth);
}

function mousePressed() {
  if (theDepth < 7) {
    theDepth++;
  }

  theColour = color(random(255),random(255),random(255));
}

function sierpinskiTriangle(points, depth) {

  fill(theColour);

  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);

  // exit
  if (depth > 0) {
    // draw upper triangle
    sierpinskiTriangle([points[0], midpoint(points[0], points[1]), midpoint(points[0], points[2])], depth - 1);

    // draw left triangle
    sierpinskiTriangle([points[1], midpoint(points[1], points[0]), midpoint(points[1], points[2])], depth - 1);

    // draw right triangle
    sierpinskiTriangle([points[2], midpoint(points[2], points[0]), midpoint(points[2], points[1])], depth - 1);
  }
}

function midpoint(point1, point2) {
  let midX = (point1.x + point2.x)/2;
  let midY = (point1.y + point2.y)/2;
  return {x: midX, y: midY};
}