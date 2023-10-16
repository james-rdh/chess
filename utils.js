function positionToCoordinates(position) {
  const file = position.charCodeAt(0) - 'a'.charCodeAt(0);
  const rank = parseInt(position[1]) - 1;
  if (0 <= rank < 8 && 0 <= file < 8) {
    return [rank, file];
  } else {
    return null;
  }
}