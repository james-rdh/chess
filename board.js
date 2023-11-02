/*
board.history
push the starting position
push whenever a piece "moves"
*/
class Board {
  constructor() {
    this.position = Array.from({ length: 8 }, () => new Array(8).fill(null));
    this.positionHistory = [];
    this.display = null;
    this.newDisplay();
  }

  newDisplay() {
    this.display = document.createElement("div");
    this.display.classList.add("board");
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const square = document.createElement("div");
        square.className = "square";
        if ((row + column) % 2 === 0) {
          square.classList.add("white");
        } else {
          square.classList.add("black");
        }
        this.display.appendChild(square);
      }
    }
  }

  refreshDisplay() {
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const piece = this.getPiece(row, column);
        const index = row * 8 + column;
        const square = this.display.childNodes[index];
        square.innerHTML = (piece instanceof Piece) ? piece.display.outerHTML : "";
      }
    }
  }

  getPiece(row, column) {
    return this.position.at(row)[column];
  }

  setPiece(row, column, piece) {
    this.position.at(row)[column] = piece;
    const index = row * 8 + column;
    const square = this.display.childNodes[index];
    square.innerHTML = (piece instanceof Piece) ? piece.display.outerHTML : "";
  }

  getPosition() {
    return this.position;
  }

  setPosition(id) {
    if (id="starting") {
      // Pawns
      for (let column = 0; column < 8; column++) {
        this.setPiece(6, column, new Pawn("white"));
        this.setPiece(1, column, new Pawn("black"));
      }
      // Knights
      this.setPiece(0, 1, new Knight("black"));
      this.setPiece(0, 6, new Knight("black"));
      this.setPiece(7, 1, new Knight("white"));
      this.setPiece(7, 6, new Knight("white"));
      // Bishops
      this.setPiece(0, 2, new Bishop("black"));
      this.setPiece(0, 5, new Bishop("black"));
      this.setPiece(7, 2, new Bishop("white"));
      this.setPiece(7, 8 - 3, new Bishop("white"));
      // Rooks
      this.setPiece(0, 0, new Rook("black"));
      this.setPiece(0, 7, new Rook("black"));
      this.setPiece(7, 0, new Rook("white"));
      this.setPiece(7, 7, new Rook("white"));
      // Queens
      this.setPiece(0, 3, new Queen("black"));
      this.setPiece(7, 3, new Queen("white"));
      // Kings
      this.setPiece(0, 4, new King("black"));
      this.setPiece(7, 4, new King("white"));
    }
  }

  movePiece(startRow, startColumn, endRow, endColumn) {
    const piece = this.getPiece(startRow, startColumn);
    setPiece(endRow, endColumn, piece);
    setPiece(startRow, startColumn, null);
    this.positionHistory.push(this.position);
  }

  isWithinBounds(startRow, startColumn, endRow, endColumn) {
    return startRow >= 0 && startRow < 8 &&
      startColumn >= 0 && startColumn < 8 &&
      endRow >= 0 && endRow < 8 &&
      endColumn >= 0 && endColumn < 8;
  }

  isValidMove(startRow, startColumn, endRow, endColumn) {
    if (!this.isWithinBounds(startRow, startColumn, endRow, endColumn)) {
      return false;
    }
    const piece = this.getPiece(startRow, startColumn);
    if (!(piece instanceof Piece)) {
      return false;
    }
    if (!piece.isValidMove(startRow, startColumn, endRow, endColumn)) {
      return false;
    }
    // this.getPiece(startRow, startColumn).isValidMove()
  }

  // getValidMoves(startRow, startColumn) {
  //   const moves = [];
  //   const piece = this.getPiece(startRow, startColumn);
  //   const size = 8;
  //   if (
  //     startRow >= 1 && startRow <= size &&
  //     startColumn >= 1 && startColumn <= size
  //   ) {
  //     validMoves = this.getPiece(startRow, startColumn).getValidMoves();
  //     // remove valid moves that are invalid board moves
  //   }
  //   return validMoves;
  // }

  getPieces() { //! replace with foreach
    const pieces = [];
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const piece = this.getPiece(row, column);
        if (piece instanceof Piece) {
          pieces.push(piece);
        }
      }
    }
    return pieces;
  }

  getPiecesByColour(colour) { //! replace with foreach
    const pieces = [];
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const piece = this.getPiece(row, column);
        if (piece instanceof Piece && piece.colour === colour) {
          pieces.push(piece);
        }
      }
    }
    return pieces;
  }

  countPieces() { //! replace with foreach
    let pieceCount = 0;
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const piece = this.getPiece(row, column);
        if (piece instanceof Piece) {
          pieceCount++;
        }
      }
    }
    return pieceCount;
  }

  countPiecesByColour(colour) { //! replace with foreach
    let pieceCount = 0;
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const piece = this.getPiece(row, column);
        if (piece instanceof Piece && piece.colour === colour) {
          pieceCount++;
        }
      }
    }
    return pieceCount;
  }

  findKing(colour) { //! replace with foreach
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const piece = this.getPiece(row, column);
        if (piece instanceof King && piece.colour === colour) {
          return [row, column];
        }
      }
    }
    return null;
  }

  // isThreefoldRepetition() {
  //   let positionCount = {};
  //   for (const position of positionHistory) {
  //     if (position in positionCount) {
  //       positionCount[position]++;
  //     } else {
  //       positionCount[position] = 1;
  //     }
  //     if (positionCount[position] >= 3) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
}