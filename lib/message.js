class Message {
  constructor (message, game) {
    this.game = game;
    this.message = message;
    this.pos = [0, 180];
    this.width = 100;
    this.height = 50;
    this.transparency = 1;
  }

  move () {
    this.pos[1] -= 1;
  }

  draw (ctx) {
    this.transparency = this.transparency - 0.04;

    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);

    ctx.font = "18px arcade";
    ctx.fontStyle="bold";
    ctx.fillStyle = `rgba(252,45,28,${this.transparency})`;
    ctx.fillText(this.message, this.pos[0] + 150, this.pos[1] + 20);

    ctx.strokeStyle = "black";
    ctx.closePath();
  }
}

module.exports = Message;
