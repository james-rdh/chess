class Piece {
  constructor(colour, value = null) {
    this.colour = colour;
    this.value = value;
  }

  isValidMove(startRank, startFile, endRank, endFile) {
    return startRank !== endRank || startFile !== endFile;
  }
}

// -------------- PAWN --------------- //

class Pawn extends Piece {
  constructor(colour, value = 1) {
    super(colour, value);
    this.direction = this.colour === "white" ? 1 : -1;
    this.enpassant = null;
    this.display = document.createElement("span");
    this.display.innerText = this.colour === "white" ? "\u2659" : "\u265F";
  }

  isValidMove(startRank, startFile, endRank, endFile) {
    if (!super.isValidMove(startRank, startFile, endRank, endFile)) {
      return false;
    }
    if (startFile === endFile) {
      if (endRank - startRank === this.direction) {
        return true;
      }
      if (this.enpassant === null && endRank - startRank === 2 * this.direction) {
        return true;
      }
    // isCaptureMove, check for capture moves
    // const captureMoves = this.getCaptureMoves();
    // moves.push(...captureMoves);
    // moves = moves.filter(([r, f]) => 0 <= r < boardSize && 0 <= f < boardSize);
    }
    return false;
  }

  // getValidMoves() {
  //   const row = this.row;
  //   const column = this.column;
  //   const direction = this.direction;
  //   const moves = [];
  //   moves.push([row + direction, file]);
  //   if (this.enpassant = null) {
  //     moves.push([row + 2 * direction, file]);
  //   }
  //   const captureMoves = this.getCaptureMoves();
  //   moves.push(...captureMoves);
  //   // moves = moves.filter(([r, f]) => 0 <= r < boardSize && 0 <= f < boardSize);
  //   return moves;
  // }

  // isValidCapture(rank, file) {
  //   if (!super.isValidMove(startRank, startFile, endRank, endFile)) {
  //     return false;
  //   }
  //   // Check if the target position contains an opponent's piece
  //   if (1 <= rank <= this.board.boardSize && 1 <= file <= this.board.boardSize) {
  //     const targetPiece = this.board.getPiece(rank, file);
  //     if (targetPiece !== null && targetPiece.colour !== this.colour) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

//   getValidCaptures() {
//     const rank = this.rank;
//     const file = this.file;
//     const direction = this.direction;
//     const captureMoves = [];
//     const captureOffsets = [[direction, -1], [direction, 1]];
//     for (const [offsetRank, offsetFile] of captureOffsets) {
//       const targetRank = rank + offsetRank;
//       const targetFile = file + offsetFile;
//       if (this.isValidCapture(targetRank, targetFile)) {
//         captureMoves.push([targetRank, targetFile]);
//       }
//     }
//     return captureMoves;
//   }
}

// ---------------- KNIGHT ---------------- //

class Knight extends Piece {
  constructor(colour, value = 3) {
    super(colour, value);
    this.display = document.createElement("span");
    this.display.innerText = this.colour === "white" ? "\u2658" : "\u265E";
  }

  isValidMove(startRank, startFile, endRank, endFile) {
    if (!super.isValidMove(startRank, startFile, endRank, endFile)) {
      return false;
    }
    const rowChange = endRank - startRank;
    const columnChange = endFile - startFile;
    if ((abs(rowChange) === 2 && abs(columnChange) === 1) ||
      (abs(columnChange) === 2 && abs(rowChange) === 1)) {
      return true;
    }
    return false;
  }

  getValidMoves(rank, file) {
    return [
      [rank - 2, file + 1],
      [rank - 1, file + 2],
      [rank + 1, file + 2],
      [rank + 2, file + 1],
      [rank + 2, file - 1],
      [rank + 1, file - 2],
      [rank - 1, file - 2],
      [rank - 2, file - 1],
    ];
  }
}

// --------------- BISHOP ---------------- //

class Bishop extends Piece {
  constructor(colour, value = 3) {
    super(colour, value);
    this.display = document.createElement("span");
    this.display.innerText = this.colour === "white" ? "\u2657" : "\u265D";
  }
  
  isValidMove(startRank, startFile, endRank, endFile) {
    if (!super.isValidMove(startRank, startFile, endRank, endFile)) {
      return false;
    }
    return abs(endFile - startFile) === abs(endRank - startRank);
  }

  // getValidMoves(row, column) {
  //   const moves = [];
  //   // Diagonal movement
  //   for (let i = 1; i < 8; i++) {
  //     // Up-right
  //     if (row - i >= 0 && column + i < 8) {
  //       moves.push([rank - i, column + i]);
  //     }
  //     // Up-left
  //     if (row - i >= 0 && column - i >= 0) {
  //       moves.push([rank - i, column - i]);
  //     }
  //     // Down-right
  //     if (row + i < 8 && column + i < 8) {
  //       moves.push([rank + i, column + i]);
  //     }
  //     // Down-left
  //     if (row + i < 8 && column - i >= 0) {
  //       moves.push([rank + i, column - i]);
  //     }
  //   }
  //   return moves;
  // }
}

// ------------------ ROOK -------------------- //

class Rook extends Piece {
  constructor(colour, value = 5) {
    super(colour, value);
    this.value = 5;
    this.display = document.createElement("span");
    this.display.innerText = this.colour === "white" ? "\u2656" : "\u265C";
  }

  isValidMove(startRank, startFile, endRank, endFile) {
    if (!super.isValidMove(startRank, startFile, endRank, endFile)) {
      return false;
    }
    return (startRank === endRank || startFile === endFile);
  }

  // getValidMoves(rank, file) {
  //   const moves = [];
  //   // Horizontal movement
  //   for (let f = file + 1; f < 8; f++) {
  //     moves.push([rank, f]);
  //   }
  //   for (let f = file - 1; f >= 0; f--) {
  //     moves.push([rank, f]);
  //   }
  //   // Vertical movement
  //   for (let r = rank + 1; r < 8; r++) {
  //     moves.push([r, file]);
  //   }
  //   for (let r = rank - 1; r >= 0; r--) {
  //     moves.push([r, file]);
  //   }
  //   return moves;
  // }
}

// ---------------- QUEEN ------------------- //

class Queen extends Piece {
  constructor(colour, value = 9) {
    super(colour);
    this.value = value;
    this.display = document.createElement("span");
    this.display.innerText = this.colour === "white" ? "\u2655" : "\u265B";
  }

  isValidMove(startRank, startFile, endRank, endFile) {
    if (!super.isValidMove(startRank, startFile, endRank, endFile)) {
      return false;
    }
    return (startFile === endFile) ||
    (startRank === endRank) ||
    abs(endFile - startFile) === abs(endRank - startRank);
  }

  // getValidMoves(rank, file) {
  //   const moves = [];
  //   // Horizontal and vertical movement
  //   for (let f = file + 1; f < 8; f++) {
  //     moves.push([rank, f]);
  //   }
  //   for (let f = file - 1; f >= 0; f--) {
  //     moves.push([rank, f]);
  //   }
  //   for (let r = rank + 1; r < 8; r++) {
  //     moves.push([r, file]);
  //   }
  //   for (let r = rank - 1; r >= 0; r--) {
  //     moves.push([r, file]);
  //   }
  //   // Diagonal movement
  //   for (let i = 1; i < 8; i++) {
  //     // Up-right
  //     if (rank - i >= 0 && file + i < 8) {
  //       moves.push([rank - i, file + i]);
  //     }
  //     // Up-left
  //     if (rank - i >= 0 && file - i >= 0) {
  //       moves.push([rank - i, file - i]);
  //     }
  //     // Down-right
  //     if (rank + i < 8 && file + i < 8) {
  //       moves.push([rank + i, file + i]);
  //     }
  //     // Down-left
  //     if (rank + i < 8 && file - i >= 0) {
  //       moves.push([rank + i, file - i]);
  //     }
  //   }
  //   return moves;
  // }
}

// -------------------- KING -------------------- //

class King extends Piece {
  constructor(colour) {
    super(colour);
    this.display = document.createElement("span");
    this.display.innerText = this.colour === "white" ? "\u2654" : "\u265A";
  }

  isValidMove(startRank, startFile, endRank, endFile) {
    return abs(endRank - startRank) <= 1 && abs(endFile - startFile) <= 1;
  }

  // getValidMoves(rank, file) {
  //   return [
  //     [rank - 1, file], // Up
  //     [rank - 1, file + 1], // Up-Right
  //     [rank, file + 1], // Right
  //     [rank + 1, file + 1], // Down-Right
  //     [rank + 1, file], // Down
  //     [rank + 1, file - 1], // Down-Left
  //     [rank, file - 1], // Left
  //     [rank - 1, file - 1], // Up-Left
  //   ];
  // }
}
