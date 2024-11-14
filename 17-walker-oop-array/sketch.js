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

let sharkieArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let sharkie = new Walker(width/2+1, height/2+1, 255, 90, 255);
  sharkieArray.push(sharkie);
}

function draw() {
  for (shark of sharkieArray) {
    shark.move();
    shark.display();
  }
}

function mousePressed() {
  let randomColour = color(random(255), random(255), random(255));
  let someSharkie = new Walker(mouseX, mouseY, randomColour);
  sharkieArray.push(someSharkie);
}
