// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const TILE_SIZE = 20;
let tileArray = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let x = 0; x < width; x += TILE_SIZE) {
    for (let y = 0; y < height; y += TILE_SIZE) {
      let someTile = spawnTile(x,y);
      tileArray.push(someTile);
    }
  }
}

function draw() {
  background(220);
  strokeWeight(15);
  //display tile
  for (let myTile of tileArray) {
    stroke(myTile.r,myTile.g,myTile.b);
    line(myTile.x1,myTile.y1,myTile.x2,myTile.y2);
    
  }
}


function spawnTile(x, y) {
  let tile;
  let choice = random(100);

  if (choice < 50) {
    // negative slope
    tile = {
      x1: x - TILE_SIZE/2,
      y1: y - TILE_SIZE/2,
      x2: x + TILE_SIZE/2,
      y2: y + TILE_SIZE/2,
    };
  } 
  else {
    // positive slope
    tile = {
      x1: x - TILE_SIZE/2,
      y1: y + TILE_SIZE/2,
      x2: x + TILE_SIZE/2,
      y2: y - TILE_SIZE/2,
    };
  }
  tile.r = round(random(0,255));
  tile.g = round(random(0,255));
  tile.b = round(random(0,255));


  return tile;
}