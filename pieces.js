// ------------- PIECES --------------- //
class Piece {
  constructor(colour) {
    this.colour = colour;
    this.position = null;
    this.value = null;
    this.moveNum = 0;
  }

  isValidMove(position) {
    if (this.position) {
      return this.position[0] !== position &&
        this.position[1] !== position[1];
    }
  }

  isValidCapture(position) {
    return this.position !== position;
  }

  movePosition(position) {
    this.position = position;
    this.moveNum++;
  }

  setPosition(position) {
    this.position = position;
  }
}

// -------------- PAWN --------------- //
class Pawn extends Piece {
  constructor(colour) {
    super(colour);
    this.value = 1;
    this.direction = this.colour === 'white' ? -1 : 1;
    this.moveDirections = [
      [this.direction, 0]
    ]
    this.captureDirections = [
      [this.direction, -1],
      [this.direction,  1]
    ]
    // display
    this.display = document.createElement('span');
    this.display.innerText = this.colour === 'white' ? '\u2659' : '\u265F';
  }

  isValidMove(position) {
    if (!super.isValidMove(position)) {
      return false;
    }
    const rowChange = position[0] - this.position[0];
    const columnChange = position[1] - this.position[1];
    if (columnChange !== 0) {
      return false;
    }
    else if (rowChange === this.direction) {
      return true;
    }
    else if (rowChange === 2 * this.direction && this.moveNum === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  isValidCapture(position) {
    const rowChange = position[0] - this.position[0];
    const columnChange = position[1] - this.position[1];
    if (rowChange === this.direction && Math.abs(columnChange) === 1) {
      return true;
    }
    return false;
  }

  getMoveList(limit = 2) {
    const moveList = [];
    this.moveDirections.foreach(move => {
      for (i = 1; i < limit; i++) {
        moveList.push([this.position[0] + i * move[0], this.position[1] + i * move[1]]);
      }
    })
    if (this.moveNum === 0) {
      moveList.push([this.position[0] + 2 * move[0], this.position[1] + 2 * move[1]])
    }
    return moveList;
  }

  getCaptureList() {
    const captureList = [];
    this.captureDirections.foreach(capture => {
      captureList.push([this.position[0] + capture[0], this.position[1] + capture[1]]);
    })
    return captureList;
  }
}

// ---------------- KNIGHT ---------------- //
class Knight extends Piece {
  constructor(colour) {
    super(colour);
    this.value = 3;
    this.moveDirections = [
      [ 2,  1],
      [ 2, -1],
      [ 1,  2],
      [ 1, -2],
      [-2,  1],
      [-2, -1],
      [-1,  2],
      [-1, -2]
    ]
    this.captureDirections = this.moveDirections;
    // display
    this.display = document.createElement('span');
    this.display.innerText = this.colour === 'white' ? '\u2658' : '\u265E';
  }

  isValidMove(position) {
    if (!super.isValidMove(position)) {
      return false;
    }
    const rowChange = position[0] - this.position[0];
    const columnChange = position[1] - this.position[1];
    if (Math.abs(rowChange) === 2 && Math.abs(columnChange) === 1) {
      return true;
    }
    return false;
  }

  isValidCapture(position) {
    return this.isValidMove(position);
  }

  getMoveList() {
    const moveList = [];
    this.moveDirections.foreach(move => {
      moveList.push([this.position[0] + move[0], this.position[1] + move[1]]);
    })
    return moveList;
  }

  getCaptureList() {
    const captureList = [];
    this.captureDirections.foreach(capture => {
      captureList.push([this.position[0] + capture[0], this.position[1] + capture[1]]);
    })
    return captureList;
  }
}

// --------------- BISHOP ---------------- //
class Bishop extends Piece {
  constructor(colour) {
    super(colour);
    this.value = 3;
    this.moveDirections = [
      [ 1,  1],
      [ 1, -1],
      [-1,  1],
      [-1, -1]
    ];
    this.captureDirections = this.moveDirections;
    // display
    this.display = document.createElement('span');
    this.display.innerText = this.colour === 'white' ? '\u2657' : '\u265D';
  }

  isValidMove(position) {
    if (!super.isValidMove(position)) {
      return false;
    }
    const rowChange = position[0] - this.position[0];
    const columnChange = position[1] - this.position[1];
    return Math.abs(rowChange) === Math.abs(columnChange);
  }

  isValidCapture(position) {
    return this.isValidMove(position);
  }

  getMoveList(limit = 8) {
    const moveList = [];
    this.moveDirections.foreach(move => {
      for (i = 1; i < limit; i++) {
        moveList.push([this.position[0] + i * move[0], this.position[1] + i * move[1]]);
      }
    })
  }

  getCaptureList(limit = 8) {
    const captureList = [];
    this.captureDirections.foreach(capture => {
      for (i = 1; i < limit; i++) {
        captureList.push([this.position[0] + i * capture[0], this.position[1] + i * capture[1]]);
      }
    })
  }
}

// ------------------ ROOK -------------------- //
class Rook extends Piece {
  constructor(colour) {
    super(colour);
    this.value = 5;
    this.moveDirections = [
      [ 1,  0],
      [ 0,  1],
      [-1,  0],
      [ 0, -1]
    ];
    this.captureDirections = this.moveDirections;
    // display
    this.display = document.createElement('span');
    this.display.innerText = this.colour === 'white' ? '\u2656' : '\u265C';
  }

  isValidMove(position) {
    if (!super.isValidMove(position)) {
      return false;
    }
    const rowChange = position[0] - this.position[0];
    const columnChange = position[1] - this.position[1];
    return !rowChange || !columnChange;
  }

  isValidCapture(position) {
    return this.isValidMove(position);
  }

  getMoveList(limit = 8) {
    const moveList = [];
    this.moveDirections.foreach(move => {
      for (i = 1; i < limit; i++) {
        moveList.push([this.position[0] + i * move[0], this.position[1] + i * move[1]]);
      }
    })
    return moveList;
  }

  getCaptureList(limit = 8) {
    const captureList = [];
    this.captureDirections.foreach(capture => {
      for (i = 1; i < limit; i++) {
        captureList.push([this.position[0] + i * capture[0], this.position[1] + i * capture[1]]);
      }
    })
    return captureList;
  }
}

// ---------------- QUEEN ------------------- //
class Queen extends Piece {
  constructor(colour) {
    super(colour);
    this.value = 9;
    this.moveDirections = [
      [ 1,  0],
      [ 1,  1],
      [ 0,  1],
      [-1,  0],
      [-1, -1],
      [ 0, -1],
      [-1,  1],
      [ 1, -1]
    ];
    this.captureDirections = this.moveDirections;
    // display
    this.display = document.createElement('span');
    this.display.innerText = this.colour === 'white' ? '\u2655' : '\u265B';
  }

  isValidMove(position) {
    if (!super.isValidMove(position)) {
      return false;
    }
    const rowChange = position[0] - this.position[0];
    const columnChange = position[1] - this.position[1];
    return (!(rowChange === 0 && columnChange === 0)) &&
      (Math.abs(rowChange) === Math.abs(columnChange));
  }

  isValidCapture(position) {
    return this.isValidMove(position);
  }

  getMoveList(limit = 8) {
    const moveList = [];
    this.moveDirections.foreach(move => {
      for (i = 1; i < limit; i++) {
        moveList.push([this.position[0] + i * move[0], this.position[1] + i * move[1]]);
      }
    })
    return moveList;
  }

  getCaptureList(limit = 8) {
    const captureList = [];
    this.captureDirections.foreach(capture => {
      for (i = 1; i < limit; i++) {
        captureList.push([this.position[0] + i * capture[0], this.position[1] + i * capture[1]]);
      }
    })
    return captureList;
  }
}

// -------------------- KING -------------------- //

class King extends Piece {
  constructor(colour) {
    super(colour);
    this.moveDirections = [
      [ 1,  1],
      [ 1,  0],
      [ 1, -1],
      [ 0,  1],
      [ 0, -1],
      [-1,  1],
      [-1,  0],
      [-1, -1]
    ];
    this.captureDirections = this.moveDirections;
    // display
    this.display = document.createElement('span');
    this.display.innerText = this.colour === 'white' ? '\u2654' : '\u265A';
  }

  isValidMove(position) {
    if (!super.isValidMove(position)) {
      return false;
    }
    const rowChange = position[0] - this.position[0];
    const columnChange = position[1] - this.position[1];
    return Math.abs(rowChange) <= 1 && Math.abs(columnChange) <= 1;
  }

  isValidCapture(position) {
    return this.isValidMove(position);
  }

  getMoveList() {
    const moveList = [];
    this.moveDirections.foreach(move => {
      moveList.push([this.position[0] + move[0], this.position[1] + move[1]]);
    })
    return moveList;
  }

  getCaptureList() {
    const captureList = [];
    this.captureDirections.foreach(capture => {
      captureList.push([this.position[0] + capture[0], this.position[1] + capture[1]]);
    })
    return captureList;
  }
}