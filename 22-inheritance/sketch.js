// oop inheritance demo

//parent class
class Shape {
  constructor(x,y,theColour) {
    this.x = x;
    this.y = y;
    this.theColour = theColour;
  }

  //common display for all shapes
  display() {
    noStroke();
    fill(this.theColour);
  }

  //common move func
  move() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
  }
}

//child class
class Circle extends Shape {
  constructor(x,y,theColour,radius) {
    super(x,y,theColour);
    this.radius = radius;
  }
  
  //overide display
  display() {
    super.display();
    circle(this.x,this.y,this.radius*2);
  }
}

//child class
class Square extends Shape {
  constructor(x,y,theColour,size) {
    super(x,y,theColour);
    this.size = size;
  }

  //display overide
  display() {
    super.display();
    square(this.x, this.y, this.size);
  }
}

let shapies = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 50; i++) {
    if (random(100) < 50) {
      let theCircle = new Circle(random(width), random(height), color(random(255),random(255),random(255)), random(20,50));
      shapies.push(theCircle);
    }
    else {
      let theSquare = new Square(random(width), random(height), color(random(255),random(255),random(255)), random(20,50));
      shapies.push(theSquare);
    }
  }
}

function draw() {
  background(220);

  for (let someShapie of shapies) {
    someShapie.move();
    someShapie.display();
  }
}
