// fireworks oop

const NUM_OF_PARTICLES_PER_CLICK = 200;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.size = 5;
    this.r = 255;
    this.g = 90;
    this.b = 255;
    this.a = 255;
  }

  display() {
    fill(this.r, this.g, this.b, this.a);
    circle(this.x, this.y, this.size);

  }

  update() {
    //move
    this.x += this.dx;
    this.y += this.dy;
    //fade
    this.a-=5;
  }

  isDead() {
    return this.a <= 0;
  }
}

let boom = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  noStroke();
  background(0);
  for (let firework of boom) {
    if (firework.isDead()) {
      //remove
      let index = boom.indexOf(firework);
      boom.splice(index, 1);
    }
    else {
      //display
      firework.update();
      firework.display();
    }

  }
}

function mousePressed() {
  for (let i = 0; i < NUM_OF_PARTICLES_PER_CLICK; i++) {
    let someParticle = new Particle(mouseX, mouseY);
    boom.push(someParticle);
  }
}
