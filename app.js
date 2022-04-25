class Player {
  constructor(color) {
    this.color = color;
  }
}

class Game {
  constructor(width, height, p1, p2) {
    this.players = [p1, p2];
    this.width = width; // contsructor automatically gets called
    this.height = height; // contsructor automatically gets called
    this.currPlayer = p1; // contsructor automatically gets called
    this.board = []; // contsructor automatically gets called
  }
  makeBoard() {
    for (let i = 0; i < this.height; i++) {
      let rowArr = [];
      for (let i = 0; i < this.width; i++) {
        rowArr.push(null);
      }
      this.board.push(rowArr);
    }
    return this.board;
  }
  makeHtmlBoard() {
    const htmlBoard = document.createElement("table");
    htmlBoard.setAttribute("id", "board");
    document.querySelector("#game").append(htmlBoard);
    // create the top 'header' row of the game board and append a row of dummy cells into it, then append that to the htmlBoard
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", this.handleClick.bind(this));

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }
    htmlBoard.append(top);

    // create the rows of the gameboard based on the HEIGHT and WIDTH specifications and append them into the htmlBoard
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement("tr");
      for (var x = 0; x < this.width; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }
      htmlBoard.append(row);
    }
  }
  findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0
    if (this.board[0][x] !== null) {
      let yPos = null;
      return yPos;
    } else {
      let yPos = 0;
      for (let i = 0; i < this.board.length; i++) {
        const row = this.board[i];
        if (row[x] === null) {
          yPos++;
        }
      }
      return yPos - 1;
    }
  }
  placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell
    console.log(this.currPlayer);
    const cell = document.getElementById(`${y}-${x}`);
    const piece = document.createElement("div");
    piece.setAttribute("class", "piece");
    piece.style.backgroundColor = this.currPlayer.color;
    cell.append(piece);
    this.board[y][x] = this.currPlayer;
  }
  endGame(msg) {
    document.querySelector("#board").remove();
    const gameOver = document.createElement("div");
    gameOver.innerText = msg;

    const playAgain = document.createElement("button");
    playAgain.addEventListener("click", () => {
      document.querySelector("#game").innerHTML = "";
      const theGame = new Game(6, 7, pOne, pTwo);
      theGame.makeBoard();
      theGame.makeHtmlBoard();
    });
    playAgain.innerText = "Play Again?";
    document.querySelector("#game").append(gameOver, playAgain);
  }
  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;
    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      return this.endGame(`${this.currPlayer.color} player wins!`);
    }

    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame
    if (
      this.board.every((row) => {
        row.every((cell) => cell !== null);
      })
    ) {
      this.endGame();
    }

    // switch players
    // TODO: switch currPlayer 1 <-> 2
    this.currPlayer === this.players[0]
      ? (this.currPlayer = this.players[1])
      : (this.currPlayer = this.players[0]);
  }
  _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.height &&
        x >= 0 &&
        x < this.width &&
        this.board[y][x] === this.currPlayer
    );
  }
  checkForWin() {
    // TODO: for each cell in the game board:
    // check to see if there is a win in the horizontal, vertical, diagonal(right) and diagonal(left) directions
    // return true if any of these conditions are met

    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        var vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        var diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        var diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        if (
          this._win(horiz) ||
          this._win(vert) ||
          this._win(diagDR) ||
          this._win(diagDL)
        ) {
          return true;
        }
      }
    }
  }
}

let pOne = new Player("red");
let pTwo = new Player("blue");
const buttonDiv = document.querySelector("#play-div");
const playGame = document.querySelector("#play-btn");
playGame.addEventListener("click", () => {
  pOne = new Player(document.querySelector("#p1-color").value);
  pTwo = new Player(document.querySelector("#p2-color").value);
  buttonDiv.remove();
  const theGame = new Game(6, 7, pOne, pTwo);
  theGame.makeBoard();
  theGame.makeHtmlBoard();
});
