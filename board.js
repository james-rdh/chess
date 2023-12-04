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
    return this.position?.at(position[0])?.[position[1]] ?? null;
  }

  setPiece(piece, position) {
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

  isBlockedMove(piece, position) {
    // iterate through move direction
    // piece.getMoveDirections();
    // check for any piece in way
    return null;
  }

  isValidMove(piece, position) {
    return this.isWithinBounds(position) &&
      piece.isValidMove(position) &&
      !this.isBlockedMove(piece, position);
  }

  isValidCapture(piece, position) {
    return true;
  }

  getValidMoves(piece) {
    const validMoves = [];
    const moveDirections = this.getPiece(position).getMoveDirections();
    // iterate through move directions
    // remove valid moves that are invalid board moves
    return validMoves;
  }

  getMoveList(piece) {
    const moveList = [];
    const moveDirections = this.getMoveDirections();
    moveDirections.foreach(move => {
      moveList.push([this.position[0] + move[0], this.position[1] + move[1]]);
    })
    if (this.moveNum === 0) {
      moveList.push([this.position[0] + 2 * move[0], this.position[1] + 2 * move[1]])
    }
    return moveList;
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