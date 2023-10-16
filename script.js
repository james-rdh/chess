document.addEventListener("DOMContentLoaded", function() {
  myFunction();
});

function myFunction() {
  // this function will create the right-sized game board in the right place on the screen
  function initialiseBoard() {
    const board = document.querySelector("#board");
    board.style.display = "grid"
    board.style.gridTemplateColumns = "repeat(8, 1fr)";
    board.style.gridTemplateRows = "repeat(8, 1fr)";

    // Create 64 `div` elements and add them to the `board` element.
    for (let i = 0; i < 64; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("square-id", i);
      board.appendChild(square);
    }
  
    // this function will create the starting position for the board
    
    // want a class-based approach
  }
  initialiseBoard()

}