/*
A new game is created only when there are 2 players ready (e.g. human v bot, human v human, bot v bot)
Board is created for the game
Either loaded (from an environment or saved data) or, as the default, a new board is created for a new game
The pieces are placed on the board only
Pieces interact with the game
*/

class Game {
  constructor(whitePlayer, blackPlayer) {
    // Players
    this.players =  {"white": whitePlayer, "black": blackPlayer};
    this.currentPlayer = null;
    // Board
    this.board = new Board()
    this.board.setInitialPosition();
    // Pieces
    this.pieceList = [];
    // Counters
    this.moveCounter = 0;
    this.halfMoveCounter = 0;
    this.fiftyMoveCounter = 0;
    // Time
    this.timeControl = null;
    // this.clock = new Clock();
    // Result
    this.result = null;
    // Display
    this.newDisplay();
  }

  newDisplay() {
    this.display = document.createElement("div");
    this.display.classList.add("game");
    this.display.appendChild(this.board.display);
    // append more things - e.g. clock, chat, etc.
  }

  start() {
    console.log(this.board.display);
    console.log(this.display);
    console.log("Chess game started!");
    // this.clock.start();
    let startRow, startColumn, endRow, endColumn;
    for (let row = 0; row < this.board.size; row++) {
      for (let column = 0; column < this.board.size; column++) {
        const square = this.board.getSquare(row, column);
        square.addEventListener("click", function(event) {
          if (!startRow || !startColumn) {
            startRow = row;
            startColumn = column;
          }
          else if (!endRow || !endColumn) {
            endRow = row;
            endColumn = column;
          }
          else {
            console.log("source and target already assigned");
          }
          // if no source square selected, select as source square
          // if no target square selected, select as target square
          // this.classList.toggle("selected");
        })
      }
    }
    do {
      this.currentPlayer = this.currentPlayer !== "white" ? "white" : "black";
      console.log(`It's ${this.players[this.currentPlayer].name}'s turn (${this.currentPlayer})`);
      // player selects sourceSquare
      // player selects targetSquare
      do {
        [startRow, startColumn] = squareToCoordinates(prompt("Enter source square (e.g., e4): "));
        [endRow, endColumn] = squareToCoordinates(prompt("Enter target square (e.g., d5): "));
      }
      while (!this.isValidMove(startRow, startColumn, endRow, endColumn));
      this.board.movePiece(startRow, startColumn, endRow, endColumn);
      // this.moveCounter++;
      // this.fiftyMoveCounter++;
      this.halfMoveCounter++;
    }

    // const promise = new Promise((resolve, reject) => {
    //   const [startRow, startColumn] = squareToCoordinates(prompt("Enter source square (e.g., e4): "));
    //   const [endRow, endColumn] = squareToCoordinates(prompt("Enter target square (e.g., d5): "));
    //   if (this.isValidMove(startRow, startColumn, endRow, endColumn)) {
    //     resolve();
    //   } else {
    //     reject("Invalid move");
    //   }
    // });
    // promise.then(
    //   function() {
    //     this.board.movePiece(startRow, startColumn, endRow, endColumn);
    //   }
    // );

    while (!this.isGameOver());
    // // clicks square to getValidMoves
    // // clicks another square to makeMove
    // this.players[this.currentPlayer].move(startRow, startColumn, endRow, endColumn);
    // add event for completed turn
    // console.log(this.board.position)
    this.end();
  }

  end() {
    console.log("Chess game ended.");
  }

  // select source square

  // get moves

  // get captures

  // select target square

  // if target square is not selected, deselect source square

  // movePiece(startRow, startColumn, endRow, endColumn) {
  //   const sourcePiece = this.board.getPiece(startRow, startColumn);
  //   const targetSquare = this.board.getPiece(endRow, endColumn);
  //   this.board.movePiece(startRow, startColumn, endRow, endColumn);
  //   if (sourcePiece instanceof Pawn || targetSquare instanceof Piece) {
  //     this.fiftyMoveCounter = 0;
  //   } else {
  //     this.fiftyMoveCounter++;
  //   }
  // }

  isValidMove(startRow, startColumn, endRow, endColumn) {
    if (!this.board.isValidMove(startRow, startColumn, endRow, endColumn)) {
      return false;
    }
    const piece = this.board.getPiece(startRow, startColumn);
    if (!(piece instanceof Piece) || this.currentPlayer !== piece.colour) {
      return false;
    }
    // if (this.isInCheckAfterMove(this.currentPlayer, startRow, startColumn, endRow, endColumn)) {
    //   return false;
    // }
    return true;
  }

  getMoves(piece) {
    const row = piece.row;
    const column = piece.column;
    const direction = this.direction;
    const moves = [];
    moves.push([row + direction, column]);
    if (this.enpassant = null) {
      moves.push([row + 2 * direction, column]);
    }
    const captureMoves = this.getCaptureMoves();
    moves.push(...captureMoves);
    // moves = moves.filter(([row, column]) => 0 <= r < boardSize && 0 <= f < boardSize);
    return moves;
  }

  isGameOver() {
    if (this.isInCheckmate(this.currentPlayer)) {
      console.log(`Checkmate! ${this.players[this.currentPlayer].getName()} (${this.currentPlayer}) wins!`);
      return true;
    }
    if (this.isStalemate()) {
      console.log("Stalemate! The game is a draw.");
      return true;
    }
    if (this.isDraw()) {
      console.log("The game is a draw.");
      return true;
    }
    if (this.halfMoveCounter >= 10) {
      return true;
    }
    return false;
  }

  isStalemate() {
    return false;
  }

  isDraw() {
    return false;
    // return isInsufficientMaterial() || isThreefoldRepetition() || isFiftyMoveRule();
  }

  // isInsufficientMaterial() {
  //   return !pieces.some(piece => piece instanceof Pawn) && pieces.length <= 1;
  // }


  isInCheck(colour) {
    const [kingRow, kingColumn] = this.board.findKing(colour);
    if ([kingRow, kingColumn] == null) {
      return false;
    }
    for (let row = 0; row < this.board.size; row++) {
      for (let column = 0; column < this.board.size; column++) {
        const piece = this.board.getPiece(row, column);
        if (piece instanceof Piece && piece.colour !== colour) {
          return this.isValidMove(row, column, kingRow, kingColumn);
        }
      }
    }
    return false;
  }

  // isInCheckAfterMove(colour, startRow, startColumn, endRow, endColumn) {
  //   // Make the move on a copy of the board
  //   let boardCopy = this.board.copy();
  //   boardCopy.movePiece(startRow, startColumn, endRow, endColumn);
  //   // is colour in check
    
  // }

  isInCheckmate(colour) {
    if (!this.isInCheck(colour)) {
      return false;
    }
    // // Check if the king can escape check
    // const [kingRow, kingColumn] = this.board.findKing(colour);
    // const king = this.board.getPiece(kingRow, kingColumn);
    // const validMoves = king.getValidMoves();
    // for (const move of validMoves) {
    //   if (!this.isSquareUnderAttack(move, colour)) {
    //     return false;
    //   }
    // }    // Check if any piece can block the check
    // for (const piece of this.board.getSquares(colour)) {
    //   if (piece.canBlockCheck()) {
    //     return false;
    //   }
    // }
    // for (let Row = 0; Row < 8; Row++) {
    //   for (let Column = 0; Column < 8; Column++) {
    //     const piece = getPiece(Row, Column);
    //     if (piece instanceof Piece && piece.colour === colour) {
    //       const validMoves = piece.getValidMoves(Row, Column);
    //       for (const move of validMoves) {
    //         // if none of these moves take the king out of check, return false
    //         if (!this.isInCheck(colour)) {
    //           return false;
    //         }
    //       }
    //     }
    //   }
    // }
  }
}