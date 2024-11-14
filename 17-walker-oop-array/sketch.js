// walekr OOp demo

class Walker {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.speed = 5*2;
    this.radius = 5;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  display() {
    // noStroke();
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.radius * 2);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      //up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      // down
      this.y += this.speed;
    }
    else if (choice < 75) {
      // left
      this.x -= this.speed;
    }
    else {
      // right
      this.x += this.speed;
    }
  }
}

let fox;
let cat;
let dog;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fox = new Walker(width/2, height/2, 255, 90, 255);
  cat = new Walker(300, 200, 90, 255, 255);
  dog = new Walker(300*2, 200*2, 255, 255, 90);
}

function draw() {
  // background(220);
  fox.move();
  cat.move();
  dog.move();

  fox.display();
  cat.display();
  dog.display();
}
