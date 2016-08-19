const GameView = require('./game_view.js');

class DodgeZone {
  constructor (game) {
    this.game = game;
    this.pos = [150, 50];
    this.activated = false;
  }

  activate () {
    this.activated = true;
    console.log(this.activated);
  }

  deactivate () {
    this.activated = false;
    console.log(this.activated);
  }

  strokeColor () {
    if (this.activated) {
      return "yellow";
    } else {
      return "blue";
    }
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], 50, 50);
    ctx.strokeStyle = this.strokeColor();
    ctx.stroke();
    ctx.closePath();
  }

  move () {

  }
}

module.exports = DodgeZone;
