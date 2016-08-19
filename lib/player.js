class Player {
  constructor (game) {
    this.pos = [100, 400];
    this.game = game;
    this.width = 30;
    this.height = 50;
    this.color = "blue";
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move () {

  }
}

module.exports = Player;
