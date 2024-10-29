/* eslint-disable indent */
// grid demo
// evelynn
//oct 22, 2024

// let grid = [[1,0,1,0],
//             [0,0,1,1],
//             [1,1,1,0],
//             [0,1,0,0]];

let grid;

const GRID_SIZE = 40;
let cellSize;

let shouldToggleNeighbours = false;

const OPEN_TILE = 0;
const IMPASSIBLE_TILE = 1;
const PLAYER_TILE = 2;
const GRASS_TILE = 3;

let player = {
  x: 3,
  y: 5,
};

function preload() {
  lavaimg = loadImage("assets/textures/lava.png");
  pathimg = loadImage("assets/textures/path.png");
  grassimg = loadImage("assets/textures/grass.jpg");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  // add player to grid
  grid[player.y][player.x] = PLAYER_TILE;
}

function draw() {
  background(220);
  displayGrid();
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);

  toggleCell(x,y);

  if (shouldToggleNeighbours) {
    toggleCell(x+1,y);
    toggleCell(x-1,y);
    toggleCell(x,y+1);
    toggleCell(x,y-1);
  }
}

function toggleCell(x,y) {
  if (x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE) {
    if (grid[y][x] === IMPASSIBLE_TILE) {
      grid[y][x] = OPEN_TILE;
    }
    else if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSIBLE_TILE;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "n") {
    shouldToggleNeighbours = !shouldToggleNeighbours;
  }
  if (key === "w") {
    //move up
    movePlayer(player.x, player.y - 1);
  }
  if (key === "s") {
    //move down
    movePlayer(player.x, player.y + 1);
  }
  if (key === "d") {
    //move right
    movePlayer(player.x + 1, player.y);
  }
  if (key === "a") {
    //move right
    movePlayer(player.x - 1, player.y);
  }
}

function movePlayer(x, y) {
  // keep in-bounds
  if (x >= 0   && x < GRID_SIZE && y >= 0 && y < GRID_SIZE 
    && grid[y][x] === OPEN_TILE
  ) {
    // reset last pos
    if (grid[y][x] === GRASS_TILE) {
      grid[player.y][player.x] = GRASS_TILE;
    }
    else {
      grid[player.y][player.x] = OPEN_TILE;
    }
  
    // last saved location
    player.x = x;
    player.y = y;
  
    // return player to grid
    grid[player.y][player.x] = PLAYER_TILE;
  }

}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === IMPASSIBLE_TILE) {
        // fill(0);
        image(lavaimg, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === OPEN_TILE) {
        // fill(255);
        image(pathimg, x * cellSize, y * cellSize, cellSize, cellSize);
      } 
      else if (grid[y][x] === GRASS_TILE) {
        image(grassimg, x * cellSize, y * cellSize, cellSize, cellSize0);
      }
      else if (grid[y][x] === PLAYER_TILE) {
        fill(255,0,0);
        square(x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];

  for (let y = 0; y < rows; y ++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //choose either 0 or 1, each 50% of the time
      if (random(100) < 50) {
        newGrid[y].push(IMPASSIBLE_TILE);
      }
      else {
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];

  for (let y = 0; y < rows; y ++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //choose either 0 or 1, each 50% of the time
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}