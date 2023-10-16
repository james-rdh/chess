class Piece {
  constructor(colour) {
    this.colour = colour;
  }

  getColour() {
    return this.colour;
  }
}

// -------------- PAWN --------------- //

class Pawn extends Piece {
  getSymbol() {
    return this.colour === 'white' ? '\u2659' : '\u265F';
  }

  getValidMoves(rank, file) {
    const moves = [];
    const direction = this.colour === 'white' ? -1 : 1;
    const initialRank = this.colour === 'white' ? 6 : 1;
    const boardSize = this.board.boardSize;
    // Move forward by 1 rank
    moves.push([rank + direction, file]);
    // Move forward by 2 ranks if it's the pawn's initial move
    if (rank === initialRank) {
      moves.push([rank + 2 * direction, file]);
    }
    // Capture diagonally to the left and right
    const captureMoves = this._getCaptureMoves(rank, file, direction);
    moves.push(...captureMoves);
    // Filter out moves that are outside the board boundaries
    moves = moves.filter(([r, f]) => 0 <= r < boardSize && 0 <= f < boardSize);
    return moves;
  }

  _getCaptureMoves(rank, file, direction) {
    const captureMoves = [];
    const captureOffsets = [[direction, -1], [direction, 1]];
    for (const [offsetRank, offsetFile] of captureOffsets) {
      const targetRank = rank + offsetRank;
      const targetFile = file + offsetFile;
      if (this._isValidCapture(targetRank, targetFile)) {
        captureMoves.push([targetRank, targetFile]);
      }
    }
    return captureMoves;
  }

  _isValidCapture(rank, file) {
    // Check if the target position contains an opponent's piece
    if (0 <= rank < this.board.boardSize && 0 <= file < this.board.boardSize) {
      const pieceAtTarget = this.board.getPiece(rank, file);
      if (pieceAtTarget !== null && pieceAtTarget.colour !== this.colour) {
        return true;
      }
    }
    return false;
  }

  getValidMoves(rank, file) {
    const moves = [];
    if (this.colour === 'white') {
      moves.push([rank - 1, file]);
      // Move forward by 2 ranks if it's the pawn's initial move
      if (rank === 6) {
        moves.push([rank - 2, file]);
      }
      // Capture diagonally to the left and right
      moves.push([rank - 1, file - 1]);
      moves.push([rank - 1, file + 1]);
    } else {
      moves.push([rank + 1, file]);
      // Move forward by 2 ranks if it's the pawn's initial move
      if (rank === 1) {
        moves.push([rank + 2, file]);
      }
      // Capture diagonally to the left and right
      moves.push([rank + 1, file - 1]);
      moves.push([rank + 1, file + 1]);
    }
    // Filter out moves that are outside the board boundaries
    moves = moves.filter(([r, f]) => 0 <= r < 8 && 0 <= f < 8);
    return moves;
  }
}

// --------------- BISHOP ---------------- //

class Bishop extends Piece {
  constructor(colour) {
    super(colour);
  }

  getSymbol() {
    return this.colour === 'white' ? '\u2657' : '\u265D';
  }

  getValidMoves(rank, file) {
    const moves = [];

    // Diagonal movement
    for (let i = 1; i < 8; i++) {
      // Up-right
      if (rank - i >= 0 && file + i < 8) {
        moves.push([rank - i, file + i]);
      }

      // Up-left
      if (rank - i >= 0 && file - i >= 0) {
        moves.push([rank - i, file - i]);
      }

      // Down-right
      if (rank + i < 8 && file + i < 8) {
        moves.push([rank + i, file + i]);
      }

      // Down-left
      if (rank + i < 8 && file - i >= 0) {
        moves.push([rank + i, file - i]);
      }
    }

    return moves;
  }
}

// ---------------- KNIGHT ---------------- //

class Knight extends Piece {
  constructor(colour) {
    super(colour);
  }

  getSymbol() {
    return this.colour === 'white' ? '\u2658' : '\u265E';
  }

  getValidMoves(rank, file) {
    const moves = [];

    // Knight movement pattern
    const knightMoves = [
      [rank - 2, file + 1], // Up 2, Right 1
      [rank - 1, file + 2], // Up 1, Right 2
      [rank + 1, file + 2], // Down 1, Right 2
      [rank + 2, file + 1], // Down 2, Right 1
      [rank + 2, file - 1], // Down 2, Left 1
      [rank + 1, file - 2], // Down 1, Left 2
      [rank - 1, file - 2], // Up 1, Left 2
      [rank - 2, file - 1], // Up 2, Left 1
    ];

    // Filter out moves that are outside the board boundaries
    moves = moves.filter(([r, f]) => 0 <= r < 8 && 0 <= f < 8);

    return moves;
  }
}

// ------------------ ROOK -------------------- //

class Rook extends Piece {
  constructor(colour) {
    super(colour);
  }

  getSymbol() {
    return this.colour === 'white' ? '\u2656' : '\u265C';
  }

  getValidMoves(rank, file) {
    const moves = [];

    // Horizontal movement
    for (let f = file + 1; f < 8; f++) {
      moves.push([rank, f]);
    }
    for (let f = file - 1; f >= 0; f--) {
      moves.push([rank, f]);
    }

    // Vertical movement
    for (let r = rank + 1; r < 8; r++) {
      moves.push([r, file]);
    }
    for (let r = rank - 1; r >= 0; r--) {
      moves.push([r, file]);
    }

    return moves;
  }
}

// ---------------- QUEEN ------------------- //

class Queen extends Piece {
  constructor(colour) {
    super(colour);
  }

  getSymbol() {
    return this.colour === 'white' ? '\u2655' : '\u265B';
  }

  getValidMoves(rank, file) {
    const moves = [];

    // Horizontal and vertical movement
    for (let f = file + 1; f < 8; f++) {
      moves.push([rank, f]);
    }
    for (let f = file - 1; f >= 0; f--) {
      moves.push([rank, f]);
    }
    for (let r = rank + 1; r < 8; r++) {
      moves.push([r, file]);
    }
    for (let r = rank - 1; r >= 0; r--) {
      moves.push([r, file]);
    }

    // Diagonal movement
    for (let i = 1; i < 8; i++) {
      // Up-right
      if (rank - i >= 0 && file + i < 8) {
        moves.push([rank - i, file + i]);
      }

      // Up-left
      if (rank - i >= 0 && file - i >= 0) {
        moves.push([rank - i, file - i]);
      }

      // Down-right
      if (rank + i < 8 && file + i < 8) {
        moves.push([rank + i, file + i]);
      }

      // Down-left
      if (rank + i < 8 && file - i >= 0) {
        moves.push([rank + i, file - i]);
      }
    }

    return moves;
  }
}

// -------------------- KING -------------------- //

class King extends Piece {
  constructor(colour) {
    super(colour);
  }

  getSymbol() {
    return this.colour === 'white' ? '\u2654' : '\u265A';
  }

  getValidMoves(rank, file) {
    const moves = [];

    // King movement pattern
    const kingMoves = [
      [rank - 1, file], // Up
      [rank - 1, file + 1], // Up-Right
      [rank, file + 1], // Right
      [rank + 1, file + 1], // Down-Right
      [rank + 1, file], // Down
      [rank + 1, file - 1], // Down-Left
      [rank, file - 1], // Left
      [rank - 1, file - 1], // Up-Left
    ];

    // Filter out moves that are outside the board boundaries
    moves = moves.filter(([r, f]) => 0 <= r < 8 && 0 <= f < 8);

    return moves;
  }
}
