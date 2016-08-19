class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.dodgeZone = this.game.addDodgeZone();
    this.keyPresses = {
      qPressed: false,
      wPressed: false,
      ePressed: false,
      rPressed: false
    };
  }

  bindKeyHandlers () {
    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
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

  updateDodgeZone () {
    let keyPressed = false;

    Object.keys(this.keyPresses).forEach( (key) => {
      if (this.keyPresses[key]) {
        this.dodgeZone.activate();
        keyPressed = true;
      }
    });

    if (!keyPressed) { this.dodgeZone.deactivate(); }
  }

  keyDownHandler (e) {
    switch (e.keyCode) {
      case 81:
        this.keyPresses["qPressed"] = true;
        break;
      case 87:
        this.keyPresses["wPressed"] = true;
        break;
      case 69:
        this.keyPresses["ePressed"] = true;
        break;
      case 82:
        this.keyPresses["rPressed"] = true;
        break;
    }
    this.updateDodgeZone();
  }

  keyUpHandler (e) {
    switch (e.keyCode) {
      case 81:
        this.keyPresses["qPressed"] = false;
        break;
      case 87:
        this.keyPresses["wPressed"] = false;
        break;
      case 69:
        this.keyPresses["ePressed"] = false;
        break;
      case 82:
        this.keyPresses["rPressed"] = false;
        break;
    }
    this.updateDodgeZone();
  }
}

module.exports = GameView;
