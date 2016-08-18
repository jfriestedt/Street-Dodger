const GameView = require('./game_view.js');

class DodgeZone {
  constructor (game) {
    this.game = game;
    this.pos = [150, 50];
    this.color = "blue";
  }

  activate () {
    this.color = "yellow";
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], 50, 50);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }

  move () {

  }
}

module.exports = DodgeZone;
