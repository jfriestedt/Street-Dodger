const GameView = require('./game_view.js');

class DodgeZone {
  constructor (game) {
    this.game = game;
    this.pos = [150, 250];
    this.activated = false;
    this.collidedDodgeKey = null;
  }

  activate (key) {
    this.activated = true;
    this.checkHit(key);
  }

  checkHit (key) {
    if (this.isCollidedWithDodgeKey(this.game.dodgeKeys)) {
      if (this.collidedDodgeKey.value === key) {
        this.scoreHit();
        this.game.destroyDodgeKey(this.collidedDodgeKey);
        return true;
      } else {
        this.game.sendDamage(10);
        this.game.destroyDodgeKey(this.collidedDodgeKey);
        return false;
      }
    } else {
      this.game.sendDamage(5);
      return false;
    }
  }

  scoreHit () {
    let dodgeZoneMin = this.pos[0];
    let dodgeZoneMax = this.pos[0] + 50;
    let dodgeKeyMin = this.collidedDodgeKey.pos[0];
    let dodgeKeyMax = this.collidedDodgeKey.pos[0] + 50;

    let overlap;

    if (dodgeKeyMin >= dodgeZoneMin) {
      overlap = dodgeZoneMax - dodgeKeyMin;
    } else {
      overlap = dodgeKeyMax - dodgeZoneMin;
    }

    let points = overlap * 10;
    let message;

    if (points < 100) {
      message = "LAME!";
    } else if (points < 200) {
      message = "OK!";
    } else if (points < 300) {
      message = "GOOD!";
    } else if (points < 400) {
      message = "GREAT!";
    } else if (points <= 500) {
      message = "EXCELLENT!";
    }

    this.game.updateScore(points, message);
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
      return true;
    } else {
      this.collidedDodgeKey = null;
      return false;
    }
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
