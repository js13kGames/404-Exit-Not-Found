window.addEventListener("load", buildDungeon);

// ==========================
// BUILDING OUT THE DUNGEON
// ==========================

// init constraints for dungeon size
const CANVAS_HEIGHT = 256;
const CANVAS_WIDTH = 256;

const NUMBER_OF_ROWS = 17;
const NUMBER_OF_COLUMNS = 17;

const ROWS = new Array(NUMBER_OF_ROWS).fill();
const COLUMNS = new Array(NUMBER_OF_COLUMNS).fill();

const TILE_HEIGHT = CANVAS_HEIGHT / NUMBER_OF_ROWS;
const TILE_WIDTH = CANVAS_WIDTH / NUMBER_OF_ROWS;
// init constraint for tile-type ratio between walkable & nonwalkable
const WALKABLE_TILE_CHANCE = 0.8;

buildDungeon(
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  COLUMNS,
  ROWS,
  TILE_HEIGHT,
  TILE_WIDTH
);

function buildDungeon(cHeight, cWidth, columns, rows, tHeight, tWidth) {
  const gameBG = document.getElementById("gameBG");
  const gameFG = document.getElementById("gameFG");
  const ctxBG = gameBG.getContext("2d");
  const ctxFG = gameFG.getContext("2d");
  console.log(gameBG);
  // SET UP COORDINATE PLANE
  const COORDINATES = rows.map((v, y) => {
    y = y * tHeight;

    return columns.map((v, x) => {
      x = x * tWidth;

      return {
        x,
        y
      };
    });
  });

  COORDINATES.forEach((row) => {
    row.forEach((col) => {
      const cellChance = Math.random();

      col.tileType = cellChance <= WALKABLE_TILE_CHANCE ? 1 : 0;
      ctxBG.fillStyle = col.tileType === 1 ? "green" : "red";

      // ctxFG.fillStyle = "white";
      // ctxFG.font = "8px sans-serif"
      // ctxFG.fillText(
      //   `{${col.x},${col.y}}`,
      //   col.x + tWidth / 2,
      //   col.y + tHeight / 2
      // );
      ctxBG.fillRect(col.x, col.y, tWidth, tHeight);
      // ADD VALUE OF ROW/COLUMN COORDINATE TO THE ARRAY FOR THE "i" ROW
    });
  });
  console.log(COORDINATES);

  console.log("this is the dungeon");
}

// STEPS TO REPRODUCE ABOVE TO PRODUCE CANVAS ELEMENT WITH TILES\
// 1. initiate the canvas element with a width & a height.
// 2. set up coordinate plane relative to canvas element size considering the # number of rows & colummns