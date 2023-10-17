class Player {
  constructor(name, colour) {
    this.name = name;
    this.colour = colour;
  }

  // makeMove(board) {
  //   let validMove = false;
  //   while (!validMove) {
  //     const move = prompt("Enter your move (e.g. 'e2 e4'): ");

  //     const startPos = move.split(" ")[0];
  //     const endPos = move.split(" ")[1];

  //     const startRank = board.positionToCoordinates(startPos)[0];
  //     const startFile = board.positionToCoordinates(startPos)[1];
  //     const endRank = board.positionToCoordinates(endPos)[0];
  //     const endFile = board.positionToCoordinates(endPos)[1];

  //     if (board.isValidMove(startRank, startFile, endRank, endFile, this.colour)) {
  //       board.movePiece(startRank, startFile, endRank, endFile);
  //       validMove = true;
  //     } else {
  //       console.log("Invalid move. Try again.");
  //     }
  //   }
  // }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name
  }

  getColour() {
    return this.colour;
  }

  setColour(colour) {
    this.colour = colour
  }
}
