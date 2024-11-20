// connected Nodes oop demo

let pointies = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 75; i++) {
    spawnPoint(random(50, width-50), random(50, height-50));
  }
}

function draw() {
  background(0);
  //move and line
  for (let pointie of pointies) {
    pointie.update(pointies);
  }
  //draw circles on top
  for (let pointie of pointies) {
    pointie.display();
  }
}

function mousePressed() {
  spawnPoint(mouseX, mouseY);
}

function spawnPoint(x, y) {
  let somePoint = new MovingPoint(x, y);
  pointies.push(somePoint);
}

class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.radius = 15;
    this.colour = color(random(200, 255), random(255), random(200, 255));
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.reach = 250;
    this.MIN_RADIUS = 15;
    this.MAX_RADIUS = 25;
  }

  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius*2);
  }

  update(pointieses) {
    this.screenWrap();
    this.move();
    this.screenWrap();
    this.connectTo(pointieses);
    this.changeSizeMouse();
  }

  changeSizeMouse() {
    let mouseDist = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDist < this.reach) {
      let theSize = map(mouseDist, 0, this.reach, this.MAX_RADIUS, this.MIN_RADIUS);
      this.radius = theSize;
    }
    else {
      this.radius = 15;
    }
  }

  move() {
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    //scale to movement speed
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    //move point
    this.x += this.dx;
    this.y += this.dy;

    //move time axis
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  screenWrap() {
    //tp to  opposite side of the screen
    if (this.x - this.radius > width) {
      this.x = 0;
    }
    if (this.x + this.radius < 0) {
      this.x = width;
    }
    if (this.y - this.radius > height) {
      this.y = 0;
    }
    if (this.y + this.radius < 0) {
      this.y = height;
    }
  }

  connectTo(pointies) {
    for (let otherPoint of pointies) {
      if (this !== otherPoint) {
        let pointDist = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if (pointDist < this.reach) {
          stroke(this.colour);
          strokeWeight(6);
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }
}