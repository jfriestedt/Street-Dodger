class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.dodgeZone = this.game.addDodgeZone();
    this.keyPresses = {
      q: false,
      w: false,
      e: false,
      r: false
    };
  }

  animate (time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    if (!this.game.over) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  bindKeyHandlers () {
    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
  }

  keyDownHandler (e) {
    switch (e.keyCode) {
      case 81:
      this.keyPresses["q"] = true;
      this.game.players[0].dodge();
      break;
      case 87:
      this.keyPresses["w"] = true;
      this.game.players[0].dodge();
      break;
      case 69:
      this.keyPresses["e"] = true;
      this.game.players[0].dodge();
      break;
      case 82:
      this.keyPresses["r"] = true;
      this.game.players[0].dodge();
      break;
    }
    this.updateDodgeZone();
  }

  keyUpHandler (e) {
    switch (e.keyCode) {
      case 81:
      this.keyPresses["q"] = false;
      break;
      case 87:
      this.keyPresses["w"] = false;
      break;
      case 69:
      this.keyPresses["e"] = false;
      break;
      case 82:
      this.keyPresses["r"] = false;
      break;
    }
    this.updateDodgeZone();

  }
  start () {
    this.bindKeyHandlers();
    this.lastTime = 0;
    this.game.spawnPedestrians();
    requestAnimationFrame(this.animate.bind(this));
  }

  updateDodgeZone () {
    let keyPressed = false;

    Object.keys(this.keyPresses).forEach( (key) => {
      if (this.keyPresses[key]) {
        this.dodgeZone.activate(key);
        keyPressed = true;
      }
    });

    if (!keyPressed) { this.dodgeZone.deactivate(); }
  }
}

module.exports = GameView;
