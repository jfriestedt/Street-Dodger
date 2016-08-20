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
    this.stepCount = 0;
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
    this.stepCount += 1;
    this.game.draw(this.ctx);
    this.lastTime = time;

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

  keyDownHandler (e) {
    switch (e.keyCode) {
      case 81:
        this.keyPresses["q"] = true;
        break;
      case 87:
        this.keyPresses["w"] = true;
        break;
      case 69:
        this.keyPresses["e"] = true;
        break;
      case 82:
        this.keyPresses["r"] = true;
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
}

module.exports = GameView;
