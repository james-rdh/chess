// fgn

// pgn

// coordinates (in matrix) e.g.[1,1] to position (chess position notation) e.g."b2"

// position to coordinates

// coordinates to [rank, file]

// board position to 

function positionToCoordinates(position) {
  const file = position.charCodeAt(0) - 'a'.charCodeAt(0);
  const rank = parseInt(position[1]) - 1;
  if (0 <= rank < 8 && 0 <= file < 8) {
    return [rank, file];
  } else {
    return null;
  }
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