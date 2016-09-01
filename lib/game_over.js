const GameView = require("./game_view");
const Game = require("./game");

class GameOver {
  constructor (newGame, score) {
    const canvas = document.getElementById("sdCanvas");
    this.ctx = canvas.getContext("2d");
    this.width = 800;
    this.height = 500;
    this.image = new Image();
    this.image.src = "lib/images/game_over.png";
    this.game = newGame;
    this.score = score;
    this.active = true;
  }

  bindKeyHandlers () {
    this.enterListener = document.addEventListener(
      "keydown", this.keyDownHandler.bind(this), false
    );
  }

  display () {
    this.bindKeyHandlers();
    setInterval(function () {this.draw(this.ctx);}.bind(this), 1);
  }

  draw (ctx) {
    if (this.active) {
      ctx.beginPath();
      ctx.rect(0, 0, this.width, this.height);
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.font = "50px arcade";
      ctx.textAlign = 'center';
      ctx.fillStyle = "RED";
      ctx.fillText("GAME OVER", 400, 200);

      ctx.font = "25px arcade";
      ctx.textAlign = 'center';
      ctx.fillStyle = "black";
      ctx.fillText(`YOUR SCORE: ${this.score}`, 400, 300);

      ctx.font = "25px arcade";
      ctx.textAlign = 'center';
      ctx.fillStyle = "black";
      ctx.fillText("PRESS ENTER TO PLAY AGAIN", 400, 400);

      ctx.closePath();
    }
  }

  keyDownHandler (e) {
    switch (e.keyCode) {
      case 13:
        this.startGame();
        document.removeEventListener("keydown", this.enterListener);
        break;
    }
  }

  startGame () {
    this.gameView = new GameView(this.game, this.ctx);
    this.gameView.start();
    this.active = false;
  }
}

module.exports = GameOver;
