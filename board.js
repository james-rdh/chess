// ------------- BOARD ------------- //
class Board {
  constructor(size = 8) {
    this.size = size;
    this.position = Array.from({length: this.size}, () => new Array(this.size).fill(null));
    // display
    this.newDisplay();
    console.log('Chess board initialised');
  }

  newDisplay() {
    // display
    this.display = document.createElement('div');
    this.display.classList.add('board');
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        const square = document.createElement('div');
        square.className = 'square';
        const index = row * this.size + column;
        square.setAttribute('index', index); // look to remove, use .indexOf instead
        if ((row + column) % 2 === 0) {
          square.classList.add('white');
        } else {
          square.classList.add('black');
        }
        this.display.appendChild(square);
      }
    }
  }

  getSquare(position) {
    // display
    return this.display.childNodes[position[0] * this.size + position[1]];
  }

  updateSquare(position) {
    // display
    const piece = this.getPiece(position);
    const square = this.getSquare(position);
    square.innerHTML = (piece instanceof Piece) ? piece.display.outerHTML : "";
  }

  updateDisplay() {
    // display
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        this.updateSquare([row, column]);
      }
    }
  }

  getPiece(position) {
    if (!this.isWithinBounds(position)) {
      return null;
    }
    return this.position?.at(position[0])?.[position[1]] ?? null;
  }

  setPiece(piece, position) {
    if (!this.isWithinBounds(position)) {
      return null;
    }
    this.position.at(position[0])[position[1]] = piece;
    if (piece instanceof Piece) {
      piece.setPosition(position);
    }
    // display
    this.updateSquare(position);
  }

  movePiece(piece, position) {
    this.position.at(piece.position[0])[piece.position[1]] = null;
    this.position.at(position[0])[position[1]] = piece;
    if (piece instanceof Piece) {
      piece.movePosition(position);
    }
    // display
    this.updateSquare(position);
  }

  setPosition(id = "initial") {
    if (id === "initial") {
      for (let column = 0; column < this.size; column++) {
        this.setPiece(new Pawn("white"), [this.size - 2, column]);
        this.setPiece(new Pawn("black"), [1, column]);
      }
      this.setPiece(new Knight("black"), [0, 1]);
      this.setPiece(new Knight("black"), [0, this.size - 2]);
      this.setPiece(new Knight("white"), [this.size - 1, 1]);
      this.setPiece(new Knight("white"), [this.size - 1, this.size - 2]);
      this.setPiece(new Bishop("black"), [0, 2]);
      this.setPiece(new Bishop("black"), [0, this.size - 3]);
      this.setPiece(new Bishop("white"), [this.size - 1, 2]);
      this.setPiece(new Bishop("white"), [this.size - 1, this.size - 3]);
      this.setPiece(new Rook("black"), [0, 0]);
      this.setPiece(new Rook("black"), [0, this.size - 1]);
      this.setPiece(new Rook("white"), [this.size - 1, 0]);
      this.setPiece(new Rook("white"), [this.size - 1, this.size - 1]);
      this.setPiece(new Queen("black"), [0, 3]);
      this.setPiece(new Queen("white"), [this.size - 1, 3]);
      this.setPiece(new King("black"), [0, this.size - 4]);
      this.setPiece(new King("white"), [this.size - 1, this.size - 4]);
    }
  }

  isWithinBounds(position) {
    const row = position[0];
    const column = position[1];
    return (row >= 0 && row < this.size) &&
      (column >= 0 && column < this.size);
  }

  isAttackedBy(position) {
    this.position.foreach(piece => {
      const validCaptures = this.getValidCaptures(piece);
      if (position in validCaptures) {
        return piece.colour
      }
    })
  }

  getValidMoves(piece) {
    const validMoves = [];
    if (piece === null) {
      return validMoves;
    }
    if (piece instanceof Pawn) {
      piece.moveDirections.foreach(move => {
        const newPosition = [piece.position[0] + move[0], piece.position[1] + move[1]];
        if (
          this.isWithinBounds(newPosition) &&
          !(this.getPiece(newPosition) instanceof Piece)
        ) {
          validMoves.push(newPosition);
          if (piece.moveNum === 0) {
            const newPosition = [piece.position[0] + 2 * move[0], piece.position[1] + 2 * move[1]];
            if (
              this.isWithinBounds(newPosition) &&
              !(this.getPiece(newPosition) instanceof Piece)
            ) {
              validMoves.push(newPosition);
            }
          }
        }
      })
      return validMoves;
    }
    else if (piece instanceof Knight) {
      piece.moveDirections.foreach(move => {
        const newPosition = [piece.position[0] + move[0], piece.position[1] + move[1]];
        if (
          this.isWithinBounds(newPosition) &&
          !(this.getPiece(newPosition) instanceof Piece)
        ) {
          validMoves.push(newPosition);
        }
      })
      return validMoves;
    }
    else if (
      piece instanceof Bishop ||
      piece instanceof Rook ||
      piece instanceof Queen
    ) {
      piece.moveDirections.foreach(move => {
        for (i = 1; i < 8; i++) {
          const newPosition = [piece.position[0] + move[0], piece.position[1] + move[1]];
          if (
            this.isWithinBounds(newPosition) &&
            !(this.getPiece(newPosition) instanceof Piece)
          ) {
            validMoves.push(newPosition);
          }
          else {
            break;
          }
        }
      })
      return validMoves;
    }
    else if (
      piece instanceof King
    ) {
      piece.moveDirections.foreach(move => {
        const newPosition = [piece.position[0] + move[0], piece.position[1] + move[1]];
        if (
          this.isWithinBounds(newPosition) &&
          !(this.getPiece(newPosition) instanceof Piece)
          // && !this.isAttacked(newPosition)
        ) {
          validMoves.push(newPosition)
        }
      })
      return validMoves;
    }
    else {
      return validMoves;
    }
  }

  getValidCaptures(piece) {
    const validCaptures = [];
    if (piece === null) {
      return validCaptures;
    }
    if (piece instanceof Pawn) {
      piece.captureDirections.foreach(capture => {
        const newPosition = [piece.position[0] + capture[0], piece.position[1] + capture[1]];
        const targetPiece = this.getPiece(newPosition);
        if (
          this.isWithinBounds(newPosition) &&
          targetPiece instanceof Piece &&
          targetPiece.colour !== piece.colour
        ) {
          validCaptures.push(newPosition);
        }
      })
      return validCaptures;
    }
    else if (piece instanceof Knight) {
      piece.captureDirections.foreach(capture => {
        const newPosition = [piece.position[0] + capture[0], piece.position[1] + capture[1]];
        const targetPiece = this.getPiece(newPosition);
        if (
          this.isWithinBounds(newPosition) &&
          targetPiece instanceof Piece &&
          targetPiece.colour !== piece.colour
        ) {
          validCaptures.push(newPosition);
        }
      })
      return validCaptures;
    }
    else if (
      piece instanceof Bishop ||
      piece instanceof Rook ||
      piece instanceof Queen
    ) {
      piece.captureDirections.foreach(capture => {
        for (i = 1; i < 8; i++) {
          const newPosition = [piece.position[0] + capture[0], piece.position[1] + capture[1]];
          const targetPiece = this.getPiece(newPosition);
          if (
            this.isWithinBounds(newPosition) &&
            targetPiece instanceof Piece &&
            targetPiece.colour !== piece.colour
          ) {
            validCaptures.push(newPosition);
          }
          else {
            break;
          }
        }
      })
      return validCaptures;
    }
    else if (
      piece instanceof King
    ) {
      piece.captureDirections.foreach(capture => {
        const newPosition = [piece.position[0] + capture[0], piece.position[1] + capture[1]];
        const targetPiece = this.getPiece(newPosition);
        if (
          this.isWithinBounds(newPosition) &&
          targetPiece instanceof Piece &&
          targetPiece.colour !== piece.colour
          // && !isAttacked(newPosition)
        ) {
          validCaptures.push(newPosition)
        }
      })
      return validCaptures;
    }
    else {
      return validCaptures;
    }
  }

  getPieces() { //! replace with foreach
    const pieces = [];
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        const piece = this.getPiece([row, column]);
        if (piece instanceof Piece) {
          pieces.push(piece);
        }
      }
    }
    return pieces;
  }

  getPiecesByColour(colour) { //! replace with foreach
    // display
    const pieces = [];
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        const piece = this.getPiece([row, column]);
        if (piece instanceof Piece && piece.colour === colour) {
          pieces.push(piece);
        }
      }
    }
    return pieces;
  }

  countPieces() { //! replace with foreach
    let pieceCount = 0;
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        const piece = this.getPiece([row, column]);
        if (piece instanceof Piece) {
          pieceCount++;
        }
      }
    }
    return pieceCount;
  }

  countPiecesByColour(colour) { //! replace with foreach
    let pieceCount = 0;
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        const piece = this.getPiece([row, column]);
        if (piece instanceof Piece && piece.colour === colour) {
          pieceCount++;
        }
      }
    }
    return pieceCount;
  }

  findKing(colour) { //! replace with foreach
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        const piece = this.getPiece([row, column]);
        if (piece instanceof King && piece.colour === colour) {
          return [row, column];
        }
      }
    }
    return null;
  }
}