class Game {
  constructor(whitePlayer = new Player(), blackPlayer = new Player(), board = new Board()) {
    // Players
    this.players =  {"white": whitePlayer, "black": blackPlayer};
    this.currentPlayer = "white";
    // Board
    this.board = board;
    this.board.setupStartingPosition();
    // Counters
    this.moveCounter = 0;
    this.halfMoveCounter = 0;
    this.fiftyMoveCounter = 0;
    // Result
    this.result = null;
  }

  start() {
    console.log("Chess Game started!");
    // this.clock.start();
    while (!this.isGameOver()) {
      console.log(`It's ${this.players[this.currentPlayer].getName()}'s turn (${this.currentPlayer})`);
      this.currentPlayer.movesPieve
      this.players[this.currentPlayer].movePiece(startRank, startFile, endRank, endFile);
      // Update position history
      this.halfMoveCounter++;
      this.switchTurn();
    }
    this.end()
  }

  end() {
    console.log("Chess game ended.");
  }

  switchTurn() {
    if (this.currentPlayer === "white") {
      this.currentPlayer = "black";
    } else {
      this.currentPlayer = "white";
    }
  }

  movePiece(startRank, startFile, endRank, endFile) {
    const sourcePiece = this.board.getPiece(startRank, startFile);
    const targetPiece = this.board.getPiece(endRank, endFile);
    if (!this.isValidMove(startRank, startFile, endRank, endFile)) {
      return false;
    }
    this.board.movePiece(startRank, startFile, endRank, endFile);
    if (sourcePiece instanceof Pawn || targetPiece instanceof Piece) {
      this.fiftyMoveCounter = 0;
    } else {
      this.fiftyMoveCounter++;
    }
  }

  isValidMove(startRank, startFile, endRank, endFile) {
    if (!this.board.isWithinBounds(startRank, startFile, endRank, endFile)) {
      return false;
    }
    const piece = this.board.getPiece(startRank, startFile);
    if (!(piece instanceof Piece) || !piece.isValidMove() || piece.colour !== this.currentPlayer) {
      return false;
    }
    if (this.isInCheckAfterMove(this.currentPlayer, startRank, startFile, endRank, endFile)) {
      return false;
    }
    return true;
  }

  getValidMoves() {
    // 
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
    const [kingRank, kingFile] = this.board.findKing(colour); // const kingPosition = this.findKing(colour);
    if ([kingRank, kingFile] == [null, null]) { // if (kingPosition is false) {return false;}
      return false;
    }
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const piece = this.board.getPiece(rank, file);
        if (piece instanceof Piece && piece.colour !== colour) {
          if (this.isValidMove(rank, file, kingRank, kingFile)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  isInCheckAfterMove(colour, startRank, startFile, endRank, endFile) {
    // Make the move on a copy of the board
    boardCopy = this.board.copy();
    boardCopy.movePiece(startRank, startFile, endRank, endFile);
    bo
  }

  isInCheckmate(colour) {
    if (!this.isInCheck(colour)) {
      return false;
    }
    // Check if the king can escape check
    const king = this.board.getKing(colour);
    const validMoves = king.getValidMoves();
    for (const move of validMoves) {
      if (!this.isSquareUnderAttack(move, colour)) {
        return false;
      }
    }    // Check if any piece can block the check
    for (const piece of this.board.getPieces(colour)) {
      if (piece.canBlockCheck()) {
        return false;
      }
    }
    // for (let rank = 0; rank < 8; rank++) {
    //   for (let file = 0; file < 8; file++) {
    //     const piece = getPiece(rank, file);
    //     if (piece instanceof Piece && piece.colour === colour) {
    //       const validMoves = piece.getValidMoves(rank, file);
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