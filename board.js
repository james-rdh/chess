/*
board.history
push the starting position
push whenever a piece "moves"
*/
class Board {
  constructor(size = 8) {
    this.size = size;
    this.position = Array.from({ length: this.size }, () => new Array(this.size).fill(null));
    this.newDisplay();
  }

  newDisplay() {
    this.display = document.createElement("div");
    this.display.classList.add("board");
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        const square = document.createElement("div");
        square.className = "square";
        const index = row * this.size + column;
        square.setAttribute("index", index);
        if ((row + column) % 2 === 0) {
          square.classList.add("white");
        } else {
          square.classList.add("black");
        }
        this.display.appendChild(square);
      }
    }
  }

  addEventListeners() {
    for (let row = 0; row < this.board.size; row++) {
      for (let column = 0; column < this.board.size; column++) {
        const square = this.board.getSquare(row, column);
        square.addEventListener("click", function(event) {
          if (!startRow || !startColumn) {
            startRow = row;
            startColumn = column;
            console.log("source assigned");
          }
          else if (!endRow || !endColumn) {
            endRow = row;
            endColumn = column;
            console.log("target assigned");
          }
          else {
            console.log("source and target already assigned");
          }
          // if no source square selected, select as source square
          // if no target square selected, select as target square
          // this.classList.toggle("selected");
        })
      }
    }
  }

  addEventListener1() {
    this.display.addEventListener("click", function(event) {
      const index = event.target.closest(".square").getAttribute("index");
      console.log(index);
      if (!sourceIndex) {
        sourceIndex = index;
        console.log("source assigned");
      }
      else if (!targetIndex) {
        targetIndex = index;
        console.log("target assigned");
      }
      else {
        console.log("source and target already assigned");
      }
    })
  }

  // let targetSquare = null;
  // this.board.addEventListener("click", function(event) {
  //   console.log(event.target);
  //   sourceSquare = (event.target !== sourceSquare) ? event.target : null;
  // })
  // this.board.addEventListener("click", function(event) {
  //   console.log(event.target);
  //   sourceSquare = (event.target !== sourceSquare) ? event.target : null;
  //   this.displayMoves(sourceSquare);
  // })
  // [sourceRow, sourceColumn] = sourceSquare
  // [targetRow, targetColumn] = targetSquare

  updateSquare(row, column) {
    const piece = this.getPiece(row, column);
    const square = this.getSquare(row, column);
    square.innerHTML = (piece instanceof Piece) ? piece.display.outerHTML : "";
  }

  updateDisplay() {
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        this.updateSquare(row, column);
      }
    }
  }

  getPiece(row, column) {
    return this.position.at(row)[column];
  }

  setPiece(row, column, piece) {
    piece.row = row;
    piece.column = column;
    this.position.at(row)[column] = piece;
    const square = this.getSquare(row, column);
    square.innerHTML = (piece instanceof Piece) ? piece.display.outerHTML : "";
  }

  getSquare(row, column) {
    return this.display.childNodes[row * this.size + column];
  }

  getPosition() {
    return this.position;
  }

  setInitialPosition() {
      // Pawns
      for (let column = 0; column < this.size; column++) {
        this.setPiece(this.size - 2, column, new Pawn("white", this.size - 2, column));
        this.setPiece(1, column, new Pawn("black", 1, column));
      }
      // Knights
      this.setPiece(0, 1, new Knight("black", 0, 1));
      this.setPiece(0, this.size - 2, new Knight("black", 0, this.size - 2));
      this.setPiece(this.size - 1, 1, new Knight("white", this.size - 1, 1));
      this.setPiece(this.size - 1, this.size - 2, new Knight("white", this.size - 1, this.size - 2));
      // Bishops
      this.setPiece(0, 2, new Bishop("black", 0, 2));
      this.setPiece(0, this.size - 3, new Bishop("black", 0, this.size - 3));
      this.setPiece(this.size - 1, 2, new Bishop("white", this.size - 1, 2));
      this.setPiece(this.size - 1, this.size - 3, new Bishop("white", this.size - 1, this.size - 3));
      // Rooks
      this.setPiece(0, 0, new Rook("black", 0, 0));
      this.setPiece(0, this.size - 1, new Rook("black", 0, this.size - 1));
      this.setPiece(this.size - 1, 0, new Rook("white", this.size - 1, 0));
      this.setPiece(this.size - 1, this.size - 1, new Rook("white", this.size - 1, this.size - 1));
      // Queens
      this.setPiece(0, 3, new Queen("black", 0, 3));
      this.setPiece(this.size - 1, 3, new Queen("white", this.size - 1, 3));
      // Kings
      this.setPiece(0, this.size - 4, new King("black", 0, this.size - 4));
      this.setPiece(this.size - 1, this.size - 4, new King("white", this.size - 1, this.size - 4));
      console.log("Set up finished");
  }

  isWithinBounds(row, column) {
    return row >= 0 && row < this.size &&
      column >= 0 && column < this.size;
  }

  isValidMove(startRow, startColumn, endRow, endColumn) {
    if (!this.isWithinBounds(startRow, startColumn) || !this.isWithinBounds(endRow, endColumn)) {
      console.log("Move is out of bounds");
      return false;
    }
    const sourcePiece = this.getPiece(startRow, startColumn);
    const targetPiece = this.getPiece(endRow, endColumn);
    if (!(sourcePiece instanceof Piece)) {
      console.log("No piece at source square");
      return false;
    }
    if (!sourcePiece.isValidMove(endRow, endColumn)) {
      console.log("Invalid piece move");
      return false;
    }
    if (targetPiece instanceof Piece && targetPiece.colour != sourcePiece.colour) {
      this.isValidCapture();
    }
    return true;
  }

  movePiece(startRow, startColumn, endRow, endColumn) {
    const piece = this.getPiece(startRow, startColumn);
    this.setPiece(endRow, endColumn, piece);
    this.setPiece(startRow, startColumn, null);
  }

  // getValidMoves(startRow, startColumn) {
  //   const moves = [];
  //   const piece = this.getPiece(startRow, startColumn);
  //   const size = this.size;
  //   if (
  //     startRow >= 1 && startRow <= size &&
  //     startColumn >= 1 && startColumn <= size
  //   ) {
  //     validMoves = this.getPiece(startRow, startColumn).getValidMoves();
  //     // remove valid moves that are invalid board moves
  //   }
  //   return validMoves;
  // }

  getMoves(piece) {
    return piece.getMoves(this.size);
  }

  getSquares() { //! replace with foreach
    const pieces = [];
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        const piece = this.getPiece(row, column);
        if (piece instanceof Piece) {
          pieces.push(piece);
        }
      }
    }
    return pieces;
  }

  getSquaresByColour(colour) { //! replace with foreach
    const pieces = [];
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
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
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
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
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        const piece = this.getPiece(row, column);
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

// interacts with the pieces