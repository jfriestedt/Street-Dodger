class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  bindKeyHandlers () {
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);
  }

  keyDownHandler (e) {
    switch (e.keyCode) {
      case 81:
        GameView.keyPresses["qPressed"] = true;
        break;
      case 87:
        GameView.keyPresses["wPressed"] = true;
        break;
      case 69:
        GameView.keyPresses["ePressed"] = true;
        break;
      case 82:
        GameView.keyPresses["rPressed"] = true;
        break;
    }
  }

  keyUpHandler (e) {
    switch (e.keyCode) {
      case 81:
        GameView.keyPresses["qPressed"] = false;
        break;
      case 87:
        GameView.keyPresses["wPressed"] = false;
        break;
      case 69:
        GameView.keyPresses["ePressed"] = false;
        break;
      case 82:
        GameView.keyPresses["rPressed"] = false;
        break;
    }
  }

  start () {
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate (time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.keyPresses = {
  qPressed: false,
  wPressed: false,
  ePressed: false,
  rPressed: false
};

module.exports = GameView;
