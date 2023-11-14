/*
A new game is created only when there are 2 players ready (e.g. human v bot, human v human, bot v bot)
Board is created for the game
Either loaded (from an environment or saved data) or, as the default, a new board is created for a new game
The pieces are placed on the board only
Pieces interact with the game
*/

class Game {
  constructor(whitePlayer, blackPlayer) {
    whitePlayer.colour = "white";
    blackPlayer.colour = "black";
    this.players =  {"white": whitePlayer, "black": blackPlayer};
    this.currentPlayer = null;
    this.board = new Board();
    this.board.setInitialPosition();
    this.startRow = null;
    this.startColumn = null;
    this.endRow = null;
    this.endColumn = null;
    this.pieceList = [];
    this.moveCounter = 0;
    this.halfMoveCounter = 0;
    this.fiftyMoveCounter = 0;
    // this.timeControl = null;
    // this.clock = new Clock();
    this.result = null;
    this.newDisplay();
    console.log("Chess game initialised");
  }

  newDisplay() {
    this.display = document.createElement("div");
    this.display.classList.add("game");
    this.display.appendChild(this.board.display);
    // append more things - e.g. clock, chat, etc.
  }

  listenForInput() {
    this.board.display.addEventListener("click", (event) => {
      if (event.target === this.board.display) {
        return null;
      }
      // if (isCurrentPlayer()) {
      const index = event.target.closest(".square").getAttribute("index");
      const row = Math.floor(index / this.board.size);
      const column = index % this.board.size;
      if (this.startRow === null || this.startColumn === null) {
        const piece = this.board.getPiece(row, column);
        if (piece instanceof Piece && piece.colour === this.currentPlayer) {
          this.startRow = row;
          this.startColumn = column;
          console.log("start position assigned: ", this.startRow, this.startColumn);
        }
      }
      else if (this.endRow === null || this.endColumn === null) {
        this.endRow = row;
        this.endColumn = column;
        console.log("end position assigned: ", this.endRow, this.endColumn);
        if (this.isValidMove(this.startRow, this.startColumn, this.endRow, this.endColumn)) {  
          this.board.movePiece(this.startRow, this.startColumn, this.endRow, this.endColumn);
          this.startRow = null;
          this.startColumn = null;
          this.endRow = null;
          this.endColumn = null;
          console.log("start and end position unassigned");
          this.moveCounter++;
          const sourcePiece = this.board.getPiece(this.startRow, this.startColumn);
          const targetPiece = this.board.getPiece(this.endRow, this.endColumn);
          if (sourcePiece instanceof Pawn || targetPiece instanceof Piece) {
            this.fiftyMoveCounter = 0;
          } else {
            this.fiftyMoveCounter++;
          }
          this.halfMoveCounter++;
          console.log("  Move ", this.moveCounter, " complete");
          this.switchTurn();
          if (this.isGameOver()) {
            this.end();
          }
        }
        else {
          this.startRow = null;
          this.startColumn = null;
          this.endRow = null;
          this.endColumn = null;
          console.log("start and end position unassigned");
        }
      }
      else {
        this.startRow = null;
        this.startColumn = null;
        this.endRow = null;
        this.endColumn = null;
      }
    })
  }

  start() {
    console.log("Chess game started!");
    this.currentPlayer = "white";
    // this.clock.start();
    this.listenForInput();
  }

  switchTurn() {
    this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
    console.log(`It's ${this.players[this.currentPlayer].name}'s turn (${this.currentPlayer})`);
    }

  end() {
    console.log("Chess game ended.");
  }

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

  getValidMoves(row, column) {
    const piece = this.board.getPiece(row, column);
    const moves = [];
    moves.push([row + piece.direction, column]);
    if (this.enpassant = null) {
      moves.push([row + 2 * direction, column]);
    }
    const captureMoves = piece.getCaptures(row, column);
    moves.push(...captureMoves);
    // moves = moves.filter(([row, column]) => 0 <= r < boardSize && 0 <= f < boardSize);
    return moves;
  }

  isGameOver() {
    if (this.isInCheckmate(this.currentPlayer)) {
      console.log(`Checkmate! ${this.players[this.currentPlayer].name} (${this.currentPlayer}) wins!`);
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
    const kingPosition = this.board.findKing(colour);
    if (kingPosition === null) {
      console.log("no king on the board");
      return false;
    }
    for (let row = 0; row < this.board.size; row++) {
      for (let column = 0; column < this.board.size; column++) {
        const piece = this.board.getPiece(row, column);
        if (piece instanceof Piece && piece.colour !== colour
          && this.isValidMove(row, column, ...kingPosition)) {
          console.log(colour, " is in check");
          return true;
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
    // Check if the king can escape check
    const kingPosition = this.board.findKing(colour);
    const king = this.board.getPiece(...kingPosition);
    const kingMoves = this.getValidMoves(king);
    for (const move of validMoves) {
      if (!this.isSquareUnderAttack(...move, colour)) {
        return false;
      }
    }
    // Check if any piece can block the check
    for (const piece of this.board.getSquares(colour)) {
      if (piece.canBlockCheck()) {
        return false;
      }
    }
    for (let Row = 0; Row < 8; Row++) {
      for (let Column = 0; Column < 8; Column++) {
        const piece = getPiece(Row, Column);
        if (piece instanceof Piece && piece.colour === colour) {
          const validMoves = piece.getValidMoves(Row, Column);
          for (const move of validMoves) {
            // if none of these moves take the king out of check, return false
            if (!this.isInCheck(colour)) {
              return false;
            }
          }
        }
      }
    }
  }
}