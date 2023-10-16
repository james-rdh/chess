class Board {
  constructor() {
    this.board = new Array(8).fill(new Array(8).fill(null));
    this.positionHistory = [];
    this.fiftyMoveCounter = 0;
  }

  initialiseBoard() {
    // Create the board as an 8x8 grid
    const board = document.querySelector("#game-board");
    board.style.display = "grid"
    board.style.gridTemplateColumns = "repeat(8, 1fr)";
    board.style.gridTemplateRows = "repeat(8, 1fr)";
    // Create a CSS grid item for each square on the chess board.
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const square = document.createElement("div");
        square.className = "board-square";
        square.style.gridColumn = j + 1;
        square.style.gridRow = i + 1;
        // Set the background color of the square.
        if ((i + j) % 2 === 0) {
          square.style.backgroundColor = "white";
        } else {
          square.style.backgroundColor = "black";
        }
        board.appendChild(square);
      }
    }
  }

//   display() {
//     for (const rank of this.board) {
//       let rankStr = '';
//       for (const piece of rank) {
//         if (piece === null) {
//           rankStr += ' -';
//         } else {
//           rankStr += ` ${piece.getSymbol()}`;
//         }
//       }
//       console.log(rankStr);
//     }
//   }

//   getPiece(rank, file) {
//     return this.board[rank][file];
//   }

//   setPiece(piece, rank, file) {
//     this.board[rank][file] = piece;
//   }

//   movePiece(startRank, startFile, endRank, endFile) {
//     const piece = this.getPiece(startRank, startFile);
//     if (piece instanceof Pawn || this.getPiece(endRank, endFile) !== null) {
//       this.fiftyMoveCounter = 0; // Reset the counter if it's a pawn move or capture
//     } else {
//       this.fiftyMoveCounter++; // Increment the counter
//     }
//     this.setPiece(piece, endRank, endFile);
//     this.setPiece(null, startRank, startFile);
//     this.positionHistory.push(this.getPosition());
//   }

//   isValidMove(move) {
//     // Check if the move is within the board bounds
//     if (!this.isWithinBounds(move)) {
//       return false;
//     }
//     const piece = this.getPiece(move.sourceRank, move.sourceFile);
//     if (piece === null || piece.color !== this.currentPlayer) {
//       return false;
//     }
//     if (!piece.isValidMove(move, this)) {
//       return false;
//     }
//     if (this.isKingInCheckAfterMove(move)) {
//       return false;
//     }
//     return true;
//   }

//   findKing(color) {
//     for (let rank = 0; rank < 8; rank++) {
//       for (let file = 0; file < 8; file++) {
//         const piece = this.board[rank][file];
//         if (piece instanceof King && piece.color === color) {
//           return [rank, file];
//         }
//       }
//     }
//     return null;
//   }

//   isInCheck(color) {
//     // Find the current player's king
//     const [kingRank, kingFile] = this.findKing(color);
//     // Check if any opponent's piece can attack the king
//     for (let rank = 0; rank < 8; rank++) {
//       for (let file = 0; file < 8; file++) {
//         const piece = this.board[rank][file];
//         if (piece instanceof Piece && piece.color !== color) {
//           if (this.isValidMove(new Move(rank, file, kingRank, kingFile))) {
//             return true;
//           }
//         }
//       }
//     }
//     return false;
//   }

//   isCheckmate(color) {
//     // Check if the king is in check
//     if (!this.isInCheck(color)) {
//       return false;
//     }
//     // Check if the king can escape check or if any piece can block the check
//     for (let rank = 0; rank < 8; rank++) {
//       for (let file = 0; file < 8; file++) {
//         const piece = this.getPiece(rank, file);
//         if (piece !== null && piece.color === color) {
//           const validMoves = piece.getValidMoves(rank, file);
//           for (const move of validMoves) {
//             if (!this.isInCheck(color)) {
//               return false;
//             }
//           }
//         }
//       }
//     }
//   }

// // Check for draw conditions
//   isDraw() {
//     return isInsufficientMaterial() || isThreefoldRepetition() || isFiftyMoveRule();
//   }

// // Check if both players have only kings remaining
//   isInsufficientMaterial() {
//     return countPieces() === 2;
//   }

// // Check if the material on the board is insufficient for either player to achieve checkmate
//   hasInsufficientMaterial(color) {
//     const pieces = getPiecesByColor(color);
//     // Insufficient material if there are no pawns or pieces other than kings
//     return !pieces.some(piece => piece instanceof Pawn) && pieces.length <= 1;
//   }

// // Count the number of pieces on the board
//   countPieces() {
//     let count = 0;
//     for (let rank = 0; rank < 8; rank++) {
//       for (let file = 0; file < 8; file++) {
//         const piece = getPiece(rank, file);
//         if (piece !== null) {
//           count++;
//         }
//       }
//     }
//     return count;
//   }

// // Get all pieces of a given color
//   getPiecesByColor(color) {
//     const pieces = [];
//     for (let rank = 0; rank < 8; rank++) {
//       for (let file = 0; file < 8; file++) {
//         const piece = getPiece(rank, file);
//         if (piece !== null && piece.color === color) {
//           pieces.push(piece);
//         }
//       }
//     }
//     return pieces;
//   }

// // Check if there has been a threefold repetition
//   isThreefoldRepetition() {
//     const positionCount = {};
//     for (const position of positionHistory) {
//       if (position in positionCount) {
//         positionCount[position]++;
//       } else {
//         positionCount[position] = 1;
//       }
//       if (positionCount[position] >= 3) {
//         return true;
//       }
//     }
//     return false;
//   }

// // Check if the fifty move rule has been applied
//   isFiftyMoveRule() {
//     return fiftyMoveCounter >= 50;
//   }

// // Get the current position of the board
//   getPosition() {
//     let position = '';
//     for (let rank = 0; rank < 8; rank++) {
//       for (let file = 0; file < 8; file++) {
//         const piece = getPiece(rank, file);
//         if (piece === null) {
//           position += '-';
//         } else {
//           position += piece.getSymbol();
//         }
//       }
//     }
//     return position;
//   }
}