class ScrollingObject {
  constructor (options) {
    this.pos = options.pos;
    this.speed = options.speed;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
    this.game = options.game;
  }

  draw (ctx) {
    let text = this.value ? this.value.toUpperCase() : "";

    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);

    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.font = "25px arcade";
    ctx.textAlign = 'right';
    ctx.fillStyle = "black";
    ctx.fillText(text, this.pos[0] + 39, this.pos[1] + 37);

    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }

  move() {
    this.pos = [this.pos[0] + this.speed, this.pos[1]];
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = ScrollingObject;
