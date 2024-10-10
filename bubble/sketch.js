// bubble notation demo
// showing how to delete objects from the array

let theBubbles = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 5; i++) {
    spawnBubble();
  }

  // create a new bubble every half second
  window.setInterval(spawnBubble, 10);
}

function draw() {
  background(0);
  // moveBubbleRandomly();
  moveBubblesWithNoise();
  displayBubbles();
}

function moveBubbleRandomly() {
  for (let bubble of theBubbles) {
    let choice = random(100);
    if (choice < 50) {
      // move up
      bubble.y -= bubble.speed;
    }
    else if (choice < 65) {
      // move down 
      bubble.y += bubble.speed;
    }
    else if (choice < 75) {
      // move right
      bubble.x += bubble.speed;
    }
    else {
      // move left
      bubble.x -= bubble.speed;
    }
  }
}

function spawnBubble() {
  let someBubble;

  someBubble = {
    x: round(random(0,width)),
    y: height + round(random(0, 50)),
    speed: random(11, 20) * 50,
    radius: round(random(20,40)),
    r: random(100,255),
    g: random(100),
    b: random(100,255),
    alpha: random(60,255),
    timeX: random(32767),
    timeY: random(32767),
    deltaTime: 0.003,
  };
  theBubbles.push(someBubble);
}

function displayBubbles() {
  for (let bubble of theBubbles) {
    noStroke();
    fill(bubble.r,bubble.g,bubble.b,bubble.alpha);
    circle(bubble.x, bubble.y, bubble.radius * 2);
  }
}

function moveBubblesWithNoise() {
  for (let bubble of theBubbles) {
    bubble.x = noise(bubble.timeX) * width;
    bubble.y = noise(bubble.timeY) * height;

    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}

function mousePressed() {
  for (let bubble of theBubbles) {
    if (clickedOnBubble(mouseX, mouseY, bubble)) {
      let theIndex = theBubbles.indexOf(bubble);
      theBubbles.splice(theIndex, 1);
    }
  }
}

function clickedOnBubble(x,y,theBubble) {
  let distanceAway = dist(x,y,theBubble.x,theBubble.y);
  return distanceAway < theBubble.radius;
}