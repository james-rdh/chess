// fgn

// pgn

// coordinates - 0-based, top left is [0, 0]
// position - 1-based, bottom left is [1, 1]
// square (chess board) e.g."b2"

function coordinatesToSquare(row, column) {
  const squareFile = String.fromCharCode("a".charCodeAt(0) + column);
  const squareRank = (8 - row).toString();
  return squareFile + squareRank;
}

function squareToCoordinates(square) {
  const row = 8 - parseInt(square[1]);
  const column = square.charCodeAt(0) - "a".charCodeAt(0);
  return [row, column];

}

function squareToPosition(square) {
  const file = square.charCodeAt(0) - "a".charCodeAt(0) + 1;
  const rank = parseInt(square[1]);
  return [file, rank];
}

function positionToSquare(file, rank) {
  const squareFile = String.fromCharCode("a".charCodeAt(0) + file - 1);
  const squareRank = rank.toString();
  return squareFile + squareRank;
}

function coordinatesToPosition(row, column) {
  const file = column + 1;
  const rank = 8 - row;
  return [file, rank];
}

function positionToCoordinates(file, rank) {
  const column = file - 1;
  const row = 8 - rank;
  return [row, column];
}

function coordinatesToIndex(row, column) {
  return row * 8 + column;
}

function indexToCoordinates(index) {
  return [Math.floor(index / 8), index % 8];
}

// function colourName(colour) {
//   if (colour === "w") {
//     colourName = "White";
//   }
//   else if (colour === "b") {
//     colourName = "Black";
//   }
//   return colour;
// }