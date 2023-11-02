document.addEventListener("DOMContentLoaded", function() {
  // Display
  const display = document.querySelector("main");

  // Menu and Buttons
  const menu = document.createElement("div");
  menu.classList.add("menu");
  const soloBtn = document.createElement("div");
  soloBtn.classList.add("button", "solo");
  const localBtn = document.createElement("div");
  localBtn.classList.add("button", "local");
  menu.appendChild(soloBtn);
  menu.appendChild(localBtn);
  display.appendChild(menu);

  // New solo game
  soloBtn.addEventListener("click", function() {
    const player = new Player("Player");
    const game = new Game(player, player);
    display.replaceChild(game.display, menu);
    game.start();
  })
  // New local game
  localBtn.addEventListener("click", function() {
    const player = new Player("Player 1");
    const opponent = new Player("Player 2");
    const playsWhite = true;
    const game = playsWhite ? new Game(player, opponent) : new Game(opponent, player);
    game.newDisplay();
    display.replaceChild(game.display, menu);
    game.start();
    }
  )

  // btnBot.addEventListener("click", function() {
  //   if (playsWhite) {
  //     const game = new Game(player, null);
  //   }
  //   else {
  //     const game = new Game(null, player)
  //   }
  // })

  // btnOnline.addEventListener("click", function() {
  //   if (playsWhite) {
  //     const game = new Game(player, opponent);
  //   }
  //   else {
  //     const game = new Game(opponent, player)
  //   }
  // })

  // for (let i = 0; i < 8; i++) {
  //   console.log(game.board.position[i]);
  // }

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