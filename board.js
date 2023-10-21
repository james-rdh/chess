class Board {
  constructor() {
    this.position = Array.from({ length: 8 }, () => new Array(8).fill(null));
    this.positionHistory = [];
  }

  setupStartingPosition() {
    // Place pawns
    for (let file = 0; file < 8; file++) {
      this.placePiece(1, file, new Pawn("white"));
      this.placePiece(6, file, new Pawn("black"));
    }
    // Place minor pieces
    this.placePiece(0, 1, new Knight("white"));
    this.placePiece(0, 6, new Knight("white"));
    this.placePiece(7, 1, new Knight("black"));
    this.placePiece(7, 6, new Knight("black"));
    this.placePiece(0, 2, new Bishop("white"));
    this.placePiece(0, 5, new Bishop("white"));
    this.placePiece(7, 2, new Bishop("black"));
    this.placePiece(7, 5, new Bishop("black"));
    // Place major pieces
    this.placePiece(0, 0, new Rook("white"));
    this.placePiece(0, 7, new Rook("white"));
    this.placePiece(7, 0, new Rook("black"));
    this.placePiece(7, 7, new Rook("black"));
    this.placePiece(0, 3, new Queen("white"));
    this.placePiece(7, 3, new Queen("black"));
    // Place kings
    this.placePiece(0, 4, new King("white"));
    this.placePiece(7, 4, new King("black"));
  }

  display() {
    // Create a CSS grid item for each square on the chess board.
    const board = document.querySelector("#board")
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const square = document.createElement("div");
        if ((i + j) % 2 === 0) {
          square.className = "square-white";
        } else {
          square.className = "square-black";
        }
        board.appendChild(square);
      }
    }
  }

  getPiece(rank, file) {
    return this.position[rank][file];
  }

  placePiece(rank, file, piece) {
    this.position[rank][file] = piece;
  }

  removePiece(rank, file) {
    this.position[rank][file] = null;
  }

  movePiece(startRank, startFile, endRank, endFile) {
    const piece = this.getPiece(startRank, startFile);
    removePiece(startRank, startFile);
    placePiece(endRank, endFile, piece);
  }

  isWithinBounds(startRank, startFile, endRank, endFile) {
    return startRank >= 0 && startRank <= 7 &&
      startFile >= 0 && startFile <= 7 &&
      endRank >= 0 && endRank <= 7 &&
      endFile >= 0 && endFile <= 7
  }

  getPieces() {
    const pieces = [];
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const piece = this.getPiece(rank, file);
        if (piece instanceof Piece) {
          pieces.push(piece);
        }
      }
    }
    return pieces;
  }

  countPieces() {
    let pieceCount = 0;
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const piece = this.getPiece(rank, file);
        if (piece instanceof Piece) {
          pieceCount++;
        }
      }
    }
    return pieceCount;
  }

  getPiecesByColour(colour) {
    const pieces = [];
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const piece = this.getPiece(rank, file);
        if (piece instanceof Piece && piece.colour === colour) {
          pieces.push(piece);
        }
      }
    }
    return pieces;
  }

  countPiecesByColour(colour) {
    let pieceCount = 0;
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const piece = this.getPiece(rank, file);
        if (piece instanceof Piece && piece.colour === colour) {
          pieceCount++;
        }
      }
    }
    return pieceCount;
  }

  findKing(colour) {
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const piece = this.getPiece(rank, file);
        if (piece instanceof King && piece.colour === colour) {
          return [rank, file];
        }
      }
    }
    return [null, null];
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