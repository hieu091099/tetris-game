/**** CONSTANT ****/
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPING = [
  "#FF1E1E", //red
  "#FF7F3F", //orange
  "#54B435", //green
  "#810CA8", //purple
  "#009EFF", //blue
  "#46C2CB", //cyan
  "#FED049", //yellow
  "white",
];

const WHITE_COLOR_ID = 7;

const BRICK_LAYOUT = [
  [
    [
      [1, 7, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 1],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 1, 7],
      [7, 1, 7],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [7, 1, 7],
      [7, 1, 1],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 1],
      [1, 1, 1],
      [7, 7, 7],
    ],
  ],
  [
    [
      [1, 7, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 1, 1],
      [1, 1, 7],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 7, 7],
      [7, 1, 1],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 7],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 7, 1],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 7],
      [7, 1, 1],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
    ],
    [
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 1, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
  ],
];
var prevBrick = 0;
var nextBrick = 0;

const KEY_CODES = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
};

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const canvasNextBrick = document.getElementById("next-brick");
const ctxb = canvasNextBrick.getContext("2d");

ctxb.canvas.width = 5 * 40;
ctxb.canvas.height = 5 * 40;
ctxb.rect(20, 20, 100, 100);
ctxb.stroke();

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

class NextBrick {
  constructor(ctx, id) {
    this.id = id;
    this.ctx = ctx;
    this.grid = this.generateWhiteBoard();
    this.layout = BRICK_LAYOUT[id];
  }
  generateWhiteBoard(id) {
    // return BRICK_LAYOUT[this.id][1];
    return Array.from({ length: 5 }, () => Array(5).fill(WHITE_COLOR_ID));
  }

  drawCell(xAxis, yAxis, colorId) {
    this.ctx.fillStyle = COLOR_MAPING[colorId] || COLOR_MAPING[WHITE_COLOR_ID];
    this.ctx.fillRect(
      xAxis * BLOCK_SIZE,
      yAxis * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
    this.ctx.fillStyle = "white";
    this.ctx.strokeRect(
      xAxis * BLOCK_SIZE,
      yAxis * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
  }

  drawBoard() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        this.drawCell(col, row, this.grid[row][col]);
      }
    }
  }

  drawBoardNext() {
    for (let row = 0; row < this.layout[0].length; row++) {
      for (let col = 0; col < this.layout[0][0].length; col++) {
        if (this.layout[0][row][col] !== WHITE_COLOR_ID) {
          nextBoard.drawCell(col + 1, row + 1, this.id);
        }
      }
    }
  }
}

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.generateWhiteBoard();
    this.score = 0;
    this.gameOver = false;
    this.isPlaying = false;
  }

  reset() {
    this.score = 0;
    this.grid = this.generateWhiteBoard();
    this.gameOver = false;
    this.drawBoard();
  }

  generateWhiteBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(WHITE_COLOR_ID));
  }

  drawCell(xAxis, yAxis, colorId) {
    this.ctx.fillStyle = COLOR_MAPING[colorId] || COLOR_MAPING[WHITE_COLOR_ID];
    this.ctx.fillRect(
      xAxis * BLOCK_SIZE,
      yAxis * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
    this.ctx.fillStyle = "white";
    this.ctx.strokeRect(
      xAxis * BLOCK_SIZE,
      yAxis * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
  }
  drawBoard() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        this.drawCell(col, row, this.grid[row][col]);
      }
    }
  }
  handleCompeleteRows() {
    const latestGrid = board.grid.filter((row) => {
      return row.some((col) => col === WHITE_COLOR_ID);
    });
    const newScore = ROWS - latestGrid.length;
    const newRow = Array.from({ length: newScore }, () =>
      Array(COLS).fill(WHITE_COLOR_ID)
    );

    board.grid = [...newRow, ...latestGrid];
    this.handleScore(newScore * 10);
    console.log({ latestGrid });
  }
  handleScore(newScore) {
    this.score += newScore;
    document.getElementById("score").innerHTML = newScore;
  }

  handleGameOver() {
    this.gameOver = true;
    this.isPlaying = false;
    alert("GAME OVER!!!");
  }
}

class Brick {
  constructor(id) {
    this.id = id;
    this.layout = BRICK_LAYOUT[id];
    this.activeIndex = 0;
    this.colPos = 3;
    this.rowPos = -2;
  }

  draw() {
    // nextBoard = new NextBrick(ctxb, this.randomNext);
    // nextBoard.drawBoard();
    // nextBoard.drawBoardNext();
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.drawCell(col + this.colPos, row + this.rowPos, this.id);
        }
      }
    }
  }
  clear() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID);
        }
      }
    }
  }
  moveLeft() {
    if (
      !this.checkCollistion(
        this.rowPos,
        this.colPos - 1,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.colPos--;
      this.draw();
    }
  }
  moveRight() {
    if (
      !this.checkCollistion(
        this.rowPos,
        this.colPos + 1,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.colPos++;
      this.draw();
    }
  }
  moveDown() {
    if (
      !this.checkCollistion(
        this.rowPos + 1,
        this.colPos,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear();
      this.rowPos++;
      this.draw();
      return;
    }
    this.handleLanded();
    //console.log("move", prevBrick);
    generateNewBrick(prevBrick);
  }

  rotate() {
    if (
      !this.checkCollistion(
        this.rowPos,
        this.colPos,
        this.layout[(this.activeIndex + 1) % 4]
      )
    ) {
      this.clear();
      this.activeIndex = (this.activeIndex + 1) % 4;
      this.draw();
    }
  }

  checkCollistion(nextRow, nextCol, nextLayout) {
    for (let row = 0; row < nextLayout.length; row++) {
      for (let col = 0; col < nextLayout[0].length; col++) {
        if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) {
          if (
            col + nextCol < 0 ||
            col + nextCol >= COLS ||
            row + nextRow >= ROWS ||
            board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
  handleLanded() {
    if (this.rowPos <= 0) {
      board.handleGameOver();
      return;
    }
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
          board.grid[row + this.rowPos][col + this.colPos] = this.id;
        }
      }
    }
    prevBrick = nextBrick;
    nextBrick = Math.floor(Math.random() * 10) % BRICK_LAYOUT.length;
    nextBoard = new NextBrick(ctxb, nextBrick);
    nextBoard.drawBoard();
    nextBoard.drawBoardNext();
    board.handleCompeleteRows();
    board.drawBoard();
  }
}
function generateNewBrick(random) {
  brick = new Brick(random);
}
let randomFirstBrick = Math.floor(Math.random() * 10) % BRICK_LAYOUT.length;

board = new Board(ctx);
board.drawBoard();
nextBoard = new NextBrick(ctxb, randomFirstBrick);
nextBoard.drawBoard();
nextBoard.drawBoardNext();
document.getElementById("play").addEventListener("click", () => {
  board.reset();
  board.isPlaying = true;
  generateNewBrick(randomFirstBrick);
  brick.randomNext = Math.floor(Math.random() * 10) % BRICK_LAYOUT.length;
  nextBoard = new NextBrick(ctxb, brick.randomNext);
  nextBoard.drawBoard();
  nextBoard.drawBoardNext();
  const refresh = setInterval(() => {
    if (board.gameOver === false) {
      brick.moveDown();
    } else {
      clearInterval(refresh);
    }
  }, 500);
});

document.addEventListener("keydown", (e) => {
  if (!board.gameOver && board.isPlaying) {
    switch (e.code) {
      case KEY_CODES.LEFT:
        brick.moveLeft();
        break;
      case KEY_CODES.RIGHT:
        brick.moveRight();
        break;
      case KEY_CODES.DOWN:
        brick.moveDown();
        break;
      case KEY_CODES.UP:
        brick.rotate();
        break;
      default:
        break;
    }
  }
});
