const GameView = require('./game_view.js');

class DodgeZone {
  constructor (game) {
    this.game = game;
    this.pos = [150, 50];
    this.activated = false;
  }

  activate () {
    this.activated = true;
  }

  deactivate () {
    this.activated = false;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], 50, 50);
    ctx.strokeStyle = this.strokeColor();
    ctx.stroke();
    ctx.closePath();
  }

  isCollidedWithDodgeKey (dodgeKeys) {
    dodgeKeys.forEach((dodgeKey) => {
      if (
        this.pos[0] + 50 > dodgeKey.pos[0] &&
        this.pos[0] < (dodgeKey.pos[0] + 50)
      ) {
        console.log('collision!');
        return true;
      }
    });

  }

  move () {
  }

  strokeColor () {
    if (this.activated) {
      return "yellow";
    } else {
      return "blue";
    }
  }

}

module.exports = DodgeZone;
