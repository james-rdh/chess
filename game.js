class Game {
  constructor() {
    this.board = new Board();
    this.players = [];
    this.currentPlayer = null;
  }

  setup() {
    const player1Name = prompt("Enter Player 1 name: ");
    const player2Name = prompt("Enter Player 2 name: ");

    const player1Color = "white";
    const player2Color = "black";

    this.player1 = new Player(player1Name, player1Color);
    this.player2 = new Player(player2Name, player2Color);

    this.players = [this.player1, this.player2];

    this.setupPieces();

    this.currentPlayer = this.player1;

    this.start();
  }

  setupPieces() {
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

    while (!this.isGameOver()) {
      this.board.display();

      console.log(`It's ${this.currentPlayer.getName()}'s turn (${this.currentPlayer.getColour()})`);
      this.currentPlayer.makeMove(this.board);

      this.switchTurn();
    }

    this.end();
  }

  switchTurn() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }

  isGameOver() {
    if (this.board.isCheckmate(this.currentPlayer.getColour())) {
      console.log(`Checkmate! ${this.currentPlayer.getName()} (${this.currentPlayer.getColour()}) wins!`);
      return true;
    }

    if (this.board.isStalemate(this.currentPlayer.getColour())) {
      console.log("Stalemate! The game is a draw.");
      return true;
    }

    if (this.board.isDraw()) {
      console.log("The game is a draw.");
      return true;
    }

    return false;
  }

  end() {
    console.log("Thanks for playing");
  }
}
