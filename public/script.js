const board = Array(4)
  .fill()
  .map(() => Array(4).fill(0));

function generateTile() {
  let emptyTiles = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) emptyTiles.push({ r, c });
    }
  }
  if (emptyTiles.length > 0) {
    let { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[r][c] = Math.random() > 0.5 ? 2 : 4;
  }
}

function drawBoard() {
  let gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  board.forEach((row) => {
    row.forEach((tile) => {
      let div = document.createElement("div");
      div.className = "tile";
      div.innerText = tile !== 0 ? tile : "";
      gameBoard.appendChild(div);
    });
  });
}

function slide(row) {
  row = row.filter((val) => val);
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
    }
  }
  return row
    .filter((val) => val)
    .concat(Array(4).fill(0))
    .slice(0, 4);
}

function move(direction) {
  let rotated = [...board];
  if (direction === "up")
    rotated = rotated[0].map((_, i) => rotated.map((row) => row[i]));
  if (direction === "right") rotated = rotated.map((row) => row.reverse());
  if (direction === "down")
    rotated = rotated[0]
      .map((_, i) => rotated.map((row) => row[i]))
      .map((row) => row.reverse());

  rotated = rotated.map((row) => slide(row));

  if (direction === "up")
    rotated = rotated[0].map((_, i) => rotated.map((row) => row[i]));
  if (direction === "right") rotated = rotated.map((row) => row.reverse());
  if (direction === "down")
    rotated = rotated
      .map((row) => row.reverse())
      .map((_, i) => rotated.map((row) => row[i]));

  board.forEach((row, r) =>
    row.forEach((_, c) => (board[r][c] = rotated[r][c]))
  );

  generateTile();
  drawBoard();
}

document.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    move(event.key.replace("Arrow", "").toLowerCase());
  }
});

generateTile();
generateTile();
drawBoard();
