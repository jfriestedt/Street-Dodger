class Ground {
  constructor (options) {
    this.game = options.game;
    this.pos = options.pos;
    this.width = 1536;
    this.height = 112;
    this.image = new Image();
    this.image.src = "lib/images/ground-alt.png";
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
    this.pos = [this.pos[0] - 1.0, this.pos[1]];
    this.wrap();
  }

  wrap () {
    if (this.pos[0] < -1536) {
      this.pos[0] += 3072;
    }
  }
}

module.exports = Ground;
