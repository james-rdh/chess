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
    this.board.setPosition("starting");
    // Counters
    this.moveCounter = 0;
    this.halfMoveCounter = 0;
    this.fiftyMoveCounter = 0;
    // // Clock
    // // clock object
    // Result
    this.result = null;
    // Display
    this.display = null;
  }

  newDisplay() {
    this.display = document.createElement("div");
    this.display.classList.add("game");
    this.display.appendChild(this.board.display);
    // add event listeners to the squares (click)
    // append more things, like a clock
  }

  start() {
    console.log("Chess Game started!");
    // this.clock.start();
    do {
      this.currentPlayer = this.currentPlayer !== "white" ? "white" : "black";
      const currentPlayerName = this.players[this.currentPlayer].getName();
      console.log(`It's ${currentPlayerName}'s turn (${this.currentPlayer})`);
      const sourceSquare = null;
      // click returns sourceSquare
      // add event listener to the board to find a square
      board.addEventListener("click", function(event) {
        sourceSquare = event.target;
        selectSquare();
      })
      this.displayMoves(sourceSquare);
      const targetSquare = null;
      // click gives targetSquare
      this.addEventListener("click", function(event) {
        targetSquare = event.target;
      })
      this.makeMove(sourceSquare, targetSquare);
      // counter++;
    }
    while (!isGameOver());
    // // clicks square to getValidMoves
    // // clicks another square to makeMove
    // this.players[this.currentPlayer].move(startRow, startColumn, endRow, endColumn);
    // add event for completed turn
    this.halfMoveCounter++;
    this.switchTurn();
    // console.log(this.board.position)
    this.end();
  }

  movePiece(startRow, startColumn, endRow, endColumn) {
    piece = this.board.getPiece(startRow, startColumn);
    if (piece instanceof Piece && piece.colour === this.currentPlayer) {
      const target = this.board.getPiece(endRow, endColumn);
      if (!this.isValidMove(startRow, startColumn, endRow, endColumn)) {
        return false;
      }
      this.board.move(startRow, startColumn, endRow, endColumn);
      if (sourcePiece instanceof Pawn || targetPiece instanceof Piece) {
        this.fiftyMoveCounter = 0;
      } else {
        this.fiftyMoveCounter++;
      }
    }
    return null;
  }

  end() {
    console.log("Chess game ended.");
    // if player calls game end when result is still null, then it is resignation
    // game calls game end automatically
    // result updated
  }

  isValidMove(startRow, startColumn, endRow, endColumn) {
    if (!this.board.isValidMove(startRow, startColumn, endRow, endColumn)) {
      return false;
    }
    const piece = this.board.getPiece(startRow, startColumn);
    if (this.currentPlayer !== piece.colour) {
      return false;
    }

    if (!sourcePiece.isValidMove()) {
      return false;
    }
    // if (this.isInCheckAfterMove(this.currentPlayer, startRow, startColumn, endRow, endColumn)) {
    //   return false;
    // }
    return true;
  }

  // getValidMoves() {
  //   return null;
  // }

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
    for (let Row = 1; Row <= this.board.size; Row++) {
      for (let Column = 1; Column <= this.board.size; Column++) {
        const piece = this.board.getSquare(Row, Column);
        if (piece instanceof Piece && piece.colour !== colour) {
          if (this.isValidMove(Row, Column, kingRow, kingColumn)) {
            return true;
          }
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
    // for (const piece of this.board.getPieces(colour)) {
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