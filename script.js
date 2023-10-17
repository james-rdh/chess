document.addEventListener("DOMContentLoaded", function() {
  // initialise the game (function tied to a button)
  const game = new Game();
  game.setup();
  // game.start()
  // game.end()
  console.log(game.players[0].name)
  console.log(game.board.board)
  console.log("All script.js read");
});