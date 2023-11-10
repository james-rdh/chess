class Piece {
  constructor(colour) {
    this.colour = colour;
    this.row = null;
    this.column = null;
  }

  isValidMove(row, column) {
    return row !== this.row || column !== this.column;
  }

  movePiece(row, column) {
    this.row = row;
    this.column = column;
  }
}

// -------------- PAWN --------------- //

class Pawn extends Piece {
  constructor(colour, row, column) {
    super(colour);
    this.row = row;
    this.column = column;
    this.value = 1;
    this.direction = this.colour === "white" ? -1 : 1;
    this.enpassant = null;
    this.display = document.createElement("span");
    this.display.innerText = this.colour === "white" ? "\u2659" : "\u265F";
  }

  getMoveDirection() {
    return [[this.direction, 0]];
  }

  isValidMove(row, column) {
    if (!super.isValidMove(row, column)) {
      return false;
    }
    const rowChange = row - this.row;
    const columnChange = column - this.column;
    if (columnChange === 0) {
      if (rowChange === this.direction) {
        return true;
      }
      if (rowChange === 2 * this.direction && this.enpassant === null) {
        return true;
      }
    }
    // isCaptureMove, check for capture moves
    // const captureMoves = this.getCaptureMoves();
    // moves.push(...captureMoves);
    // moves = moves.filter(([r, f]) => 0 <= r < boardSize && 0 <= f < boardSize);
    return false;
  }

  isValidCapture(row, column) {
    const rowChange = row - this.row;
    const columnChange = column - this.column;
    return Math.abs(columnChange) === 1 && rowChange === this.direction;
  }

//   getValidCaptures() {
//     const Row = this.Row;
//     const Column = this.Column;
//     const direction = this.direction;
//     const captureMoves = [];
//     const captureOffsets = [[direction, -1], [direction, 1]];
//     for (const [offsetRow, offsetColumn] of captureOffsets) {
//       const targetRow = Row + offsetRow;
//       const targetColumn = Column + offsetColumn;
//       if (this.isValidCapture(targetRow, targetColumn)) {
//         captureMoves.push([targetRow, targetColumn]);
//       }
//     }
//     return captureMoves;
//   }
}

// ---------------- KNIGHT ---------------- //

class Knight extends Piece {
  constructor(colour, row, column) {
    super(colour);
    this.row = row;
    this.column = column;
    this.value = 3;
    this.display = document.createElement("span");
    this.display.innerText = this.colour === "white" ? "\u2658" : "\u265E";
  }

  isValidMove(row, column) {
    if (!super.isValidMove(row, column)) {
      return false;
    }
    const rowChange = row - this.row;
    const columnChange = column - this.column;
    if ((Math.abs(rowChange) === 2 && Math.abs(columnChange) === 1) ||
      (Math.abs(columnChange) === 2 && Math.abs(rowChange) === 1)) {
      return true;
    }
    return false;
  }

  isValidCapture(row, column) {
    this.isValidMove(row, column);
  }

  getValidMoves(row, column) {
    return [
      [row - 2, column + 1],
      [row - 1, column + 2],
      [row + 1, column + 2],
      [row + 2, column + 1],
      [row + 2, column - 1],
      [row + 1, column - 2],
      [row - 1, column - 2],
      [row - 2, column - 1],
    ];
  }
}

// --------------- BISHOP ---------------- //

class Bishop extends Piece {
  constructor(colour, row, column) {
    super(colour);
    this.row = row;
    this.column = column;
    this.value = 3;
    this.display = document.createElement("span");
    this.display.innerText = this.colour === "white" ? "\u2657" : "\u265D";
  }

  isValidMove(startRow, startColumn, endRow, endColumn) {
    if (!super.isValidMove(startRow, startColumn, endRow, endColumn)) {
      return false;
    }
    const rowChange = endRow - startRow;
    const columnChange = endColumn - startColumn;
    return Math.abs(columnChange) === Math.abs(rowChange);
  }

  isValidCapture(row, column) {
    this.isValidMove(row, column);
  }

  // getValidMoves(row, column) {
  //   const moves = [];
  //   // Diagonal movement
  //   for (let i = 1; i < 8; i++) {
  //     // Up-right
  //     if (row - i >= 0 && column + i < 8) {
  //       moves.push([Row - i, column + i]);
  //     }
  //     // Up-left
  //     if (row - i >= 0 && column - i >= 0) {
  //       moves.push([Row - i, column - i]);
  //     }
  //     // Down-right
  //     if (row + i < 8 && column + i < 8) {
  //       moves.push([Row + i, column + i]);
  //     }
  //     // Down-left
  //     if (row + i < 8 && column - i >= 0) {
  //       moves.push([Row + i, column - i]);
  //     }
  //   }
  //   return moves;
  // }
}

// ------------------ ROOK -------------------- //

class Rook extends Piece {
  constructor(colour, row, column) {
    super(colour);
    this.row = row;
    this.column = column;
    this.value = 5;
    this.display = document.createElement("span");
    this.display.innerText = this.colour === "white" ? "\u2656" : "\u265C";
  }

  isValidMove(startRow, startColumn, endRow, endColumn) {
    if (!super.isValidMove(startRow, startColumn, endRow, endColumn)) {
      return false;
    }
    const rowChange = endRow - startRow;
    const columnChange = endColumn - startColumn;
    return (rowChange === 0 || columnChange === 0);
  }

  isValidCapture(row, column) {
    this.isValidMove(row, column);
  }

  // getValidMoves(Row, Column) {
  //   const moves = [];
  //   // Horizontal movement
  //   for (let f = Column + 1; f < 8; f++) {
  //     moves.push([Row, f]);
  //   }
  //   for (let f = Column - 1; f >= 0; f--) {
  //     moves.push([Row, f]);
  //   }
  //   // Vertical movement
  //   for (let r = Row + 1; r < 8; r++) {
  //     moves.push([r, Column]);
  //   }
  //   for (let r = Row - 1; r >= 0; r--) {
  //     moves.push([r, Column]);
  //   }
  //   return moves;
  // }
}

// ---------------- QUEEN ------------------- //

class Queen extends Piece {
  constructor(colour, row, column) {
    super(colour);
    this.row = row;
    this.column = column;
    this.value = 9;
    this.display = document.createElement("span");
    this.display.innerText = this.colour === "white" ? "\u2655" : "\u265B";
  }

  isValidMove(row, column) {
    if (!super.isValidMove(row, column)) {
      return false;
    }
    const rowChange = row - this.row;
    const columnChange = column - this.column;
    return (columnChange === 0) ||
    (rowChange === 0) ||
    Math.abs(columnChange) === Math.abs(rowChange);
  }

  isValidCapture(row, column) {
    this.isValidMove(row, column);
  }

  getMoves(boardSize) {
    const moves = [];
    // Add all possible moves in the horizontal direction
    for (let i = this.column + 1; i < boardSize; i++) {
      moves.push([this.row, i]);
    }
    for (let i = this.column - 1; i >= 0; i--) {
      moves.push([this.row, i]);
    }
    // Add all possible moves in the vertical direction
    for (let i = this.row + 1; i < boardSize; i++) {
      moves.push([i, this.column]);
    }
    for (let i = this.row - 1; i >= 0; i--) {
      moves.push([i, this.column]);
    }
    // Add all possible moves in the diagonal directions
    for (let i = this.row + 1, j = this.column + 1; i < boardSize && j < boardSize; i++, j++) {
      moves.push([i, j]);
    }
    for (let i = this.row - 1, j = this.column - 1; i >= 0 && j >= 0; i--, j--) {
      moves.push([i, j]);
    }
    for (let i = this.row + 1, j = this.column - 1; i < boardSize && j >= 0; i++, j--) {
      moves.push([i, j]);
    }
    for (let i = this.row - 1, j = this.column + 1; i >= 0 && j < boardSize; i--, j++) {
      moves.push([i, j]);
    }
    return moves;
  }
}

  // getValidMoves(Row, Column) {
  //   const moves = [];
  //   // Horizontal and vertical movement
  //   for (let f = Column + 1; f < 8; f++) {
  //     moves.push([Row, f]);
  //   }
  //   for (let f = Column - 1; f >= 0; f--) {
  //     moves.push([Row, f]);
  //   }
  //   for (let r = Row + 1; r < 8; r++) {
  //     moves.push([r, Column]);
  //   }
  //   for (let r = Row - 1; r >= 0; r--) {
  //     moves.push([r, Column]);
  //   }
  //   // Diagonal movement
  //   for (let i = 1; i < 8; i++) {
  //     // Up-right
  //     if (Row - i >= 0 && Column + i < 8) {
  //       moves.push([Row - i, Column + i]);
  //     }
  //     // Up-left
  //     if (Row - i >= 0 && Column - i >= 0) {
  //       moves.push([Row - i, Column - i]);
  //     }
  //     // Down-right
  //     if (Row + i < 8 && Column + i < 8) {
  //       moves.push([Row + i, Column + i]);
  //     }
  //     // Down-left
  //     if (Row + i < 8 && Column - i >= 0) {
  //       moves.push([Row + i, Column - i]);
  //     }
  //   }
  //   return moves;
  // }
// }

// -------------------- KING -------------------- //

class King extends Piece {
  constructor(colour, row, column) {
    super(colour);
    this.row = row;
    this.column = column;
    this.display = document.createElement("span");
    this.display.innerText = this.colour === "white" ? "\u2654" : "\u265A";
  }

  isValidMove(row, column) {
    if (!super.isValidMove(row, column, row, column)) {
      return false;
    }
    const rowChange = row - this.row;
    const columnChange = column - this.column;
    return Math.abs(rowChange) <= 1 && Math.abs(columnChange) <= 1;
  }

  isValidCapture(row, column) {
    this.isValidMove(row, column);
  }

  // getMoves() {
  //   return [
  //     [this.row - 1, this.column],
  //     [this.row - 1, this.column + 1],
  //     [this.row, this.column + 1],
  //     [this.row + 1, this.column + 1],
  //     [this.row + 1, this.column],
  //     [this.row + 1, this.column - 1],
  //     [this.row, this.column - 1],
  //     [this.row - 1, column - 1],
  //   ];
  // }
}
