/* eslint-disable indent */
// grid demo
// evelynn
//oct 22, 2024

// let grid = [[1,0,1,0],
//             [0,0,1,1],
//             [1,1,1,0],
//             [0,1,0,0]];

let grid;

const GRID_SIZE = 10;
let cellSize;

let shouldToggleNeighbours = false;

const BLANK_TILE = 0;
const MINE_TILE = -1;
const NUMBER_TILES = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight:8,
};

function preload() {
  mineImg = loadImage("assets/textures/mine.png");
  oneImg = loadImage("assets/textures/1.png");
  twoImg = loadImage("assets/textures/2.png");
  threeImg = loadImage("assets/textures/3.png");
  fourImg = loadImage("assets/textures/4.png");
  fiveImg = loadImage("assets/textures/5.png");
  sixImg = loadImage("assets/textures/6.png");
  sevenImg = loadImage("assets/textures/7.png");
  eightImg = loadImage("assets/textures/8.png");
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
  updateGrid();
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
    if (grid[y][x] === BLANK_TILE) {
      grid[y][x] = BLANK_TILE;
    }
    else if (grid[y][x] === BLANK_TILE) {
      grid[y][x] = BLANK_TILE;
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  // if (key === "n") {
  //   shouldToggleNeighbours = !shouldToggleNeighbours;
  // }
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === BLANK_TILE) {
        // fill(0);
        square(x * cellSize, y * cellSize, cellSize);
      }
      else if (grid[y][x] === MINE_TILE) {
        // fill(255);
        image(mineImg, x * cellSize, y * cellSize, cellSize, cellSize);
      } 
      else if (grid[y][x] === NUMBER_TILES.one) {
        image(oneImg, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === NUMBER_TILES.two) {
        image(twoImg, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === NUMBER_TILES.three) {
        image(threeImg, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === NUMBER_TILES.four) {
        image(fourImg, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === NUMBER_TILES.five) {
        image(fiveImg, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === NUMBER_TILES.six) {
        image(sixImg, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === NUMBER_TILES.seven) {
        image(sevenImg, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === NUMBER_TILES.eight) {
        image(eightImg, x * cellSize, y * cellSize, cellSize, cellSize);
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
      if (random(100) < 20) {
        newGrid[y].push(MINE_TILE);
      }
      else {
        newGrid[y].push(BLANK_TILE);
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
      newGrid[y].push(BLANK_TILE);
    }
  }
  return newGrid;
}

function updateGrid() {
  //make a new array to hold the next turn


  let searchArea = [[-1, 0, 1],
                    [-1, 0, 1],
                    [-1, 0, 1]
  ];

  //look at every cell
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      //count it's neighbours
      let neighbours = 0;

      for (let i of searchArea) {
        for (let j of searchArea) {
          //don't fall of the edge
          if (y+i >= 0 && y+i < GRID_SIZE && x+j >= 0 && x+j < GRID_SIZE) {
            if (grid[y+i][x+j] === -1) {
              neighbours += grid[y+i][x+j];
            }
          }
        }
      }



      //don't count yourself
      neighbours -= grid[y][x];

      if (neighbours === -NUMBER_TILES.one) {
        grid[y][x] = NUMBER_TILES.one;
      }
      else if (neighbours === -NUMBER_TILES.two) {
        grid[y][x] = NUMBER_TILES.two;
      }
      else if (neighbours === -NUMBER_TILES.three) {
        grid[y][x] = NUMBER_TILES.three;
      }
      else if (neighbours === -NUMBER_TILES.four) {
        grid[y][x] = NUMBER_TILES.four;
      }
      else if (neighbours === -NUMBER_TILES.five) {
        grid[y][x] = NUMBER_TILES.five;
      }
      else if (neighbours === -NUMBER_TILES.six) {
        grid[y][x] = NUMBER_TILES.six;
      }
      else if (neighbours === -NUMBER_TILES.seven) {
        grid[y][x] = NUMBER_TILES.seven;
      }
      else if (neighbours === -NUMBER_TILES.eight) {
        grid[y][x] = NUMBER_TILES.eight;
      }


      
    }
  }
}

