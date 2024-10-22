//Use the arrow keys to move your player and collect all 8 coins

/* VARIABLES */
let player, ground, monster, platforms, coins;
let score = 0;


/* SETUP RUNS ONCE */
function setup() {
  createCanvas(windowWidth-5, windowHeight-5);
  // world.gravity.y = 10;

  //Create player
  player = new Sprite(50, 250, 25, 25);
  player.color = 'grey';
  player.rotationLock = true;
  player.vel.x = 0;
  player.vel.y = 0;
  player.bounciness = 0;

  //Create ground
  ground = new Sprite(150, windowHeight, windowWidth, 200, "s");
  ground.color = color(188, 158, 130);
  ground.friction = 0;
  ground.bounciness = 0;

  //Create platforms group
  platforms = new Group();
  platforms.color = "blue";
  platforms.collider = "s";
  platforms.friction = 0;
  platforms.bounciness = 0;
  platforms.rotation = 45;

  //Create coins group
  // coins = new Group();
  // coins.color = "yellow";
  // coins.collider = "k";

  //Overlaps method takes in a Sprite or group name (coins), then calls a function (collect)
  player.overlaps(platforms, reset);

  //Load starting screen
  loadStartScreen();
}

/* DRAW LOOP REPEATS */
function draw() {
  background(144, 238, 144);
  
  //Draw instructions and score to screen
  fill(0);
  textAlign(LEFT);
  textSize(20);
  text('Coins = ' + score, 10, 60);
  textSize(15);
  text('Collect all 8 coins to win!', 10, 30);

  //Move the player
  if (kb.pressing("up")) {
    player.vel.y = -6;
  }
  else {
    player.vel.y = 6;
  }


  player.vel.x = 6;
  // if (kb.pressing("left")) {
  //   player.vel.x = -6;
  // } else if (kb.pressing("right")) {
  //   player.vel.x = 6;
  // } else {
  //   player.vel.x = 0;
  // }

  //Stop player from moving outside of screen
  if (player.x < 20) {
    player.x = 20;
  }
  
  if (player.x > 6000) {
    player.x = 20;
  }
  
  if (player.y < 20){
    player.y = 20;
  }

  //Collect 8 coins and win
  if (score == 8) {
    youWin();
  }

  //Set camera to follow player
  camera.x = player.x + 102;
  ground.x = camera.x; 
}

/* FUNCTIONS */
function loadStartScreen() {
  platforms.removeAll();
  // coins.removeAll();

  //Move player to starting position
  player.x = 50;

  //Create two platforms
  new platforms.Sprite(400, windowHeight - 100, 700, 700);
  new platforms.Sprite(800, windowHeight - 100, 700, 700);
  new platforms.Sprite(1200, windowHeight - 100, 700, 700);
  new platforms.Sprite(1400, windowHeight - 100, 700, 700);
  new platforms.Sprite(600, 0, 700, 700);
  new platforms.Sprite(1000, 0, 700, 700);
  new platforms.Sprite(1300, 0, 700, 700);

  //Create eight coins
  // new coins.Sprite(220, 170, 15);
  // new coins.Sprite(260, 170, 15);
  // new coins.Sprite(300, 170, 15);
  // new coins.Sprite(600, 350, 15);
  // new coins.Sprite(640, 350, 15);
  // new coins.Sprite(680, 350, 15);
  // new coins.Sprite(810, 350, 15);
  // new coins.Sprite(850, 350, 15);
}

function reset() {
  score = 0;
  loadStartScreen();
}

//This function uses parameters 
function collect(player, coin) {
  coin.remove();
  score = score + 1;
}

function youWin() {
  //Draw sprites off screen
  player.x = 3000;

  //Draw end of game text
  textSize(20);
  fill(0);
  text("You win!", width/2 - 50, height/2 - 30); 
  textSize(12);
  text("Press Run to play again.", width/2 - 75, height/2);
}
