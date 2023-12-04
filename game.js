// ------------- CHESS --------------- //
class Game {
  constructor(whitePlayer, blackPlayer) {
    this.players =  {'white': whitePlayer, 'black': blackPlayer};
    this.currentPlayer = 'white';
    this.board = new Board();
    this.board.setPosition();
    this.capturedPieceList = [];
    this.selectedPiece = null;
    this.plyCounter = 0;
    this.moveCounter = 0;
    this.fiftyMoveCounter = 0;
    this.result = null;
    // this.timeControl = null;
    // this.clock = new Clock();
    // display
    this.newDisplay();
    console.log('Chess game initialised');
  }

  newDisplay() {
    this.display = document.createElement('div');
    this.display.classList.add('game');
    this.display.appendChild(this.board.display);
    // append more things - e.g. clock, chat, etc.
  }

  listenForInput() {
    this.board.display.addEventListener('click', (event) => {
      if (event.target === this.board.display) { // or player !== currentPlayer
        return null;
      }
      const index = event.target.closest('.square').getAttribute('index');
      const position = [Math.floor(index / this.board.size), index % this.board.size];
      const piece = this.board.getPiece(position);
      if (
        this.selectedPiece === null &&
        piece instanceof Piece &&
        piece.colour === this.currentPlayer
      ) {
        this.selectedPiece = piece;
        console.log('piece selected');
        // show valid moves
      }
      else if (
        this.selectedPiece instanceof Piece &&
        this.isValidMove(this.selectedPiece, position)
      ) {  
        this.board.movePiece(this.selectedPiece, position);
        this.selectedPiece = null;
        this.plyCounter++;
        if (this.currentPlayer.colour === 'black') {
          this.moveCounter++;
        }
        this.switchTurn();
        if (this.isGameOver()) {
          this.end();
        }
      }
      // const sourcePiece = this.board.getPiece(this.startPosition);
      // const targetPiece = this.board.getPiece(this.endPosition);
      // if (
      //   (sourcePiece instanceof Pawn) ||
      //   (targetPiece instanceof Piece)
      // ) {
      //   this.fiftyMoveCounter = 0;
      // } else {
      //   this.fiftyMoveCounter++;
      // }
      else {
        this.selectedPiece = null;
      }
    })
  }

  start() {
    console.log('Chess game started!');
    this.currentPlayer = 'white';
    // this.clock.start();
    this.listenForInput();
  }

  switchTurn() {
    this.currentPlayer = (this.currentPlayer === 'white') ? 'black' : 'white';
    console.log(`It's ${this.players[this.currentPlayer].name}'s turn (${this.currentPlayer})`);
    }

  end() {
    console.log('Chess game ended.');
    // set result
  }

  isValidMove(startPosition, endPosition) {
    // within bounds?
    if (!(this.board.isWithinBounds(startPosition) &&
          this.board.isWithinBounds(endPosition))) {
      return false;
    }
    // player's piece?
    const sourcePiece = this.board.getPiece(startPosition);
    if (!(sourcePiece instanceof Piece && sourcePiece.colour === this.currentPlayer)) {
      return false;
    }
    // valid piece move or valid capture?
    const targetPiece = this.board.getPiece(endPosition);
    if (!(sourcePiece.isValidMove(endPosition) ||
        this.isValidCapture(startPosition, endPosition))) {
      return false;
    }
    return true;
    }
    // if (!sourcePiece.isValidCapture(endRow, endColumn)) {
    //   return false;
    // }
    // isBlocked();
    // const targetPiece = this.board.getPiece(endPosition);
    // if (enpassant)
    // if (this.isInCheckAfterMove(this.currentPlayer, startRow, startColumn, endRow, endColumn)) {
    //   return false;
    // }

  isValidMove(piece, position) {
    if (
      !(piece instanceof Piece) ||
      piece.colour !== this.currentPlayer ||
      !this.board.isWithinBounds(position)
    ) {
      return false;
    }
    const targetPiece = this.board.getPiece(position);
    if (
      !(targetPiece instanceof Piece) &&
      piece.isValidMove(position) // and move isn't blocked, maybe use board.isValidMove
    ) {
      return true;
    }
    else if (
      targetPiece instanceof Piece &&
      targetPiece.colour !== piece.colour &&
      piece.isValidCapture(position)
    ) {
      return true;
    }
    else {
      return false;
    }
  }

  // getMoveList(position) {
  //   const piece = this.board.getPiece(position);
  //   const moves = [];
  //   for (let endRow = 0; endRow < this.board.size; endRow++) {
  //     for (let endColumn = 0; endColumn < this.board.size; endColumn++) {
  //       this.isValidMove(position, [endRow, endColumn]);
  //     }
  //   }
  //   moves.push(position + [piece.direction, column]);
  //   if (this.enpassant = null) {
  //     moves.push([row + 2 * direction, column]);
  //   }
  //   const captureMoves = piece.getCaptures(row, column);
  //   moves.push(...captureMoves);
  //   // moves = moves.filter(([row, column]) => 0 <= r < boardSize && 0 <= f < boardSize);
  //   return moves;
  // }

  isGameOver() {
    if (this.isCheckmate()) {
      return true;
    }
    if (this.isStalemate()) {
      console.log('Stalemate! The game is a draw.');
      return true;
    }
    if (this.isDraw()) {
      console.log('The game is a draw.');
      return true;
    }
    if (this.halfMoveCounter >= 10) {
      return true;
    }
    return false;
  }

  isStalemate() {
    return false;
  }

  isDraw() {
    return false;
    // return isInsufficientMaterial() || isThreefoldRepetition() || isFiftyMoveRule();
  }

  // isInsufficientMaterial() {
  //   return !pieces.some(piece => piece instanceof Pawn) && pieces.length <= 1;
  // }


  isInCheck(colour) {
    const kingPosition = this.board.findKing(colour);
    if (kingPosition === null) {
      console.log('no king on the board');
      return false;
    }
    for (let row = 0; row < this.board.size; row++) {
      for (let column = 0; column < this.board.size; column++) {
        const piece = this.board.getPiece([row, column]);
        if (piece instanceof Piece && piece.colour !== colour
          && this.isValidMove([row, column], kingPosition)) {
          console.log(colour, ' is in check');
          return true;
        }
      }
    }
    return false;
  }

  // isInCheckAfterMove(colour, startRow, startColumn, endRow, endColumn) {
  //   // Make the move on a copy of the board
  //   let boardCopy = this.board.copy();
  //   boardCopy.movePiece(startRow, startColumn, endRow, endColumn);
  //   // is colour in check
    
  // }

  isCheckmate() {
    const colour = this.currentPlayer;
    if (!this.isInCheck(colour)) {
      return false;
    }
    const kingPosition = this.board.findKing(colour);
    const kingMoves = this.getValidMoves(kingPosition);
    for (const move of validMoves) {
      if (!this.isSquareUnderAttack(move, colour)) {
        return false;
      }
    }
    for (const piece of this.board.getSquares(colour)) {
      if (piece.canBlockCheck()) {
        return false;
      }
    }
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const piece = getPiece(row, column);
        if (piece instanceof Piece && piece.colour === colour) {
          const validMoves = piece.getValidMoves([row, column]);
          for (const move of validMoves) {
            if (!this.isInCheck(colour)) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  // getPieces(colour = null) {
  //   if (!colour) {
  //     return this.board.position.filter(piece => piece !== null);
  //   }
  //   return this.board.position.filter(piece => piece !== null && piece.colour === colour)
  // }
  
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