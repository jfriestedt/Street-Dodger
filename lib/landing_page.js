const GameView = require("./game_view");

class LandingPage {
  constructor (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.width = 800;
    this.height = 500;
    this.image = new Image();
    this.image.src = "lib/images/landing_page.png";
    this.gameStarted = false;
  }

  bindKeyHandlers () {
    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.rect(0, 0, this.width, this.height);
    ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height
    );
    ctx.closePath();
  }

  display () {
    this.bindKeyHandlers();
    setInterval(function () {this.draw(this.ctx);}.bind(this), 1);
  }

  keyDownHandler (e) {
    switch (e.keyCode) {
      case 13:
        this.startGame();
        break;
    }
  }

  startGame () {
    new GameView(this.game, this.ctx).start();
  }
}

module.exports = LandingPage;
