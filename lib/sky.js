class Sky {
  constructor (options) {
    this.game = options.game;
    this.pos = options.pos;
    this.width = 832;
    this.height = 360;
    this.image = new Image();
    this.image.src = "lib/images/sky.png";
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );
    ctx.closePath();
  }

  move () {
    this.pos = [this.pos[0] - 0.2, this.pos[1]];
    this.wrap();
  }

  wrap () {
    if (this.pos[0] < -832) {
      this.pos[0] += 1664;
    }
  }
}

module.exports = Sky;
