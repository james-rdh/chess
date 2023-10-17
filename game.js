class Game {
  constructor() {
    this.players = [null, null];
    this.currentPlayer = null;
    this.moveCounter = 0;
    this.fiftyMoveCounter = 0;
    this.positionHistory = [];
  }

  setup() {
    this.setupPlayers();
    this.setupBoard();
    this.setupPieces();
  }

  setupPlayers() {
    // const player1Name = prompt("Enter Player 1 name: ");
    // const player2Name = prompt("Enter Player 2 name: ");
    const player1Name = "Guest 1"
    const player2Name = "Guest 2"

    const player1Color = "white";
    const player2Color = "black";

    const player1 = new Player(player1Name, player1Color);
    const player2 = new Player(player2Name, player2Color);

    this.players = [player1, player2];

    this.currentPlayer = this.players[0];
  }

  setupBoard() {
    this.board = new Board();
  }

  setupPieces() {
    // place pieces in relevant board positions
    for (let file = 0; file < 8; file++) {
      this.board.setPiece(new Pawn("white"), 1, file);
      this.board.setPiece(new Pawn("black"), 6, file);
    }

    this.board.setPiece(new Rook("white"), 0, 0);
    this.board.setPiece(new Rook("white"), 0, 7);
    this.board.setPiece(new Rook("black"), 7, 0);
    this.board.setPiece(new Rook("black"), 7, 7);

    this.board.setPiece(new Knight("white"), 0, 1);
    this.board.setPiece(new Knight("white"), 0, 6);
    this.board.setPiece(new Knight("black"), 7, 1);
    this.board.setPiece(new Knight("black"), 7, 6);

    this.board.setPiece(new Bishop("white"), 0, 2);
    this.board.setPiece(new Bishop("white"), 0, 5);
    this.board.setPiece(new Bishop("black"), 7, 2);
    this.board.setPiece(new Bishop("black"), 7, 5);

    this.board.setPiece(new Queen("white"), 0, 3);
    this.board.setPiece(new Queen("black"), 7, 3);

    this.board.setPiece(new King("white"), 0, 4);
    this.board.setPiece(new King("black"), 7, 4);
  }

  start() {
    console.log("Chess Game started!");
    // timer
    // check for game-over
    while (!this.isGameOver()) {
      console.log(`It's ${this.currentPlayer.getName()}'s turn (${this.currentPlayer.getColour()})`);
      // this.currentPlayer.makeMove(this.board); // current player makes a move
      // check for events
      this.switchTurn();
    }
  }

  end() {
    console.log("Thanks for playing");
  }

  movePiece(startRank, startFile, endRank, endFile) {
    const piece = this.board.getPiece(startRank, startFile);
    if (piece instanceof Pawn || this.board.getPiece(endRank, endFile) !== null) {
      this.fiftyMoveCounter = 0; // Reset the counter if it's a pawn move or capture
    } else {
      this.fiftyMoveCounter++; // Increment the counter
    }
    this.board.setPiece(piece, endRank, endFile);
    this.board.setPiece(null, startRank, startFile);
    this.positionHistory.push(this.getPosition());
    if (this.currentPlayer === "white") {
      this.moveCounter++;
    }
  }

  switchTurn() {
    if (this.currentPlayer === this.players[0]) {
      this.currentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[0];
    }
  }

  isCheckmate(colour) {
    // Check if the king is in check
    if (!this.isInCheck(colour)) {
      return false;
    }
    // Check if the king can escape check or if any piece can block the check
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const piece = this.getPiece(rank, file);
        if (piece !== null && piece.colour === colour) {
          const validMoves = piece.getValidMoves(rank, file);
          for (const move of validMoves) {
            if (!this.isInCheck(colour)) {
              return false;
            }
          }
        }
      }
    }
  }

  isInsufficientMaterial() {
    return !pieces.some(piece => piece instanceof Pawn) && pieces.length <= 1;
  }

  isStalemate() {
    return false;
  }

  // isDraw {
  //   return isInsufficientMaterial() || isThreefoldRepetition() || isFiftyMoveRule();
  // }

  isGameOver() {
    if (this.isCheckmate(this.currentPlayer.getColour())) {
      console.log(`Checkmate! ${this.currentPlayer.getName()} (${this.currentPlayer.getColour()}) wins!`);
      return true;
    }

    if (this.isStalemate(this.currentPlayer.getColour())) {
      console.log("Stalemate! The game is a draw.");
      return true;
    }

    if (this.isDraw()) {
      console.log("The game is a draw.");
      return true;
    }

    return false;
  }

}
