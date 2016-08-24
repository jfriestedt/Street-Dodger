const GameView = require('./game_view.js');

class MissZone {
  constructor (game) {
    this.game = game;
    this.pos = [35, 220];
    this.collidedDodgeKey = null;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], 50, 50);
    // ctx.strokeStyle = "red";
    // ctx.stroke();
    ctx.closePath();
  }

  isCollidedWithDodgeKey (dodgeKeys) {
    let collision = false;
    let collidedDodgeKey;

    dodgeKeys.forEach((dodgeKey) => {
      if (
        this.pos[0] + 50 > dodgeKey.pos[0] &&
        this.pos[0] < (dodgeKey.pos[0] + 50)
      ) {
        collision = true;
        this.collidedDodgeKey = dodgeKey;
      }
    });

    if (collision) {
      this.game.destroyDodgeKey(this.collidedDodgeKey);
      this.game.sendDamage(10);
      return true;
    } else {
      this.collidedDodgeKey = null;
      return false;
    }
  }

  move () {
  }

}

module.exports = MissZone;
