const ScrollingObject = require('./scrolling_object');

class DodgeKey {
  constructor(options = {}) {
    let pedestrian = options.pedestrian;

    this.color = "white";
    this.pos = [pedestrian.pos[0] - 20, 220];
    this.speed = pedestrian.speed / 2;
    this.width = 50;
    this.height = 50;
    this.value = ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)];
    this.image = new Image();
    this.image.src = `lib/images/${this.value}.png`;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);

    ctx.fillStyle = this.color;
    ctx.fill();

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

    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }

  move() {
    this.pos = [this.pos[0] + this.speed, this.pos[1]];
  }
}

module.exports = DodgeKey;
