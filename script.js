document.addEventListener("DOMContentLoaded", function() {
  // Create players
  let playerName = "Chess Lover"; // read in and choose randomly from defaultNames.txt
  const player = new Player(playerName);
  const opponent = new Player("AI");
  // Intialise game
  const game = new Game(player, opponent);
  // for (let i = 0; i < 8; i++) {
  //   console.log(game.board.position[i]);
  // }
  game.start();

  // const Btn = document.getElementById("Btn");
  // Btn.addEventListener("click", function() {
  //   Btn.className = "setup";
  // })
  // Btn.addEventListener("click", function() {
  //   Btn.className = "start";
  // })
  // Btn.addEventListener("click", function() {
  //   Btn.className = "setup";
  // })
});