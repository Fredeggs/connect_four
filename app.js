/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 const board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 const makeBoard = () => {
   for (let i = 0; i < HEIGHT; i++) {
        let rowArr = [];
        for (let i = 0; i < WIDTH; i++) {
            rowArr.push(null);
        }
        board.push(rowArr);
   }
   return board;
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 const makeHtmlBoard = () => {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   const htmlBoard = document.querySelector('#board');
 
   // create the top 'header' row of the game board and append a row of dummy cells into it, then append that to the htmlBoard
   const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
   for (let x = 0; x < WIDTH; x++) {
     const headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);
 
   // create the rows of the gameboard based on the HEIGHT and WIDTH specifications and append them into the htmlBoard
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     for (var x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 const findSpotForCol = (x) => {
   // TODO: write the real version of this, rather than always returning 0
  if(board[0][x] !== null){
    let yPos = null;
    return yPos;
  }
  else{
    let yPos = 0;
    for (let i = 0; i < board.length; i++){
      const row = board[i];
      if(row[x] === null){
        yPos++;
      }
    }
    return yPos - 1;
  }
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 const placeInTable = (y, x) => {
   // TODO: make a div and insert into correct table cell
   const cell = document.getElementById(`${y}-${x}`)
   const piece = document.createElement("div");
   currPlayer === 1 ? piece.setAttribute("class", "piece p1") : piece.setAttribute("class", "piece p2");
   cell.append(piece);
   board[y][x] = currPlayer;
 }
 
 /** endGame: announce game end */
 
 const endGame = (msg) => {
   // TODO: pop up alert message
   alert(msg);
 }
 
 /** handleClick: handle click of column top to play piece */
 
 const handleClick = (evt) => {
   // get x from ID of clicked cell
   const x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   const y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   placeInTable(y, x);
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
   if (board.every((row) => { row.every((cell) => cell !== null) }))
   {
     endGame();
   }
 
   // switch players
   // TODO: switch currPlayer 1 <-> 2
   currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 const checkForWin = () => {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: for each cell in the game board:
   // check to see if there is a win in the horizontal, vertical, diagonal(right) and diagonal(left) directions
   // return true if any of these conditions are met
 
   for (var y = 0; y < HEIGHT; y++) {
     for (var x = 0; x < WIDTH; x++) {
       var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 