class ScrollingObject {
  constructor (options) {
    this.pos = options.pos;
    this.speed = options.speed;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
    this.game = options.game;
  }

  collideWith (otherObject) {

  }

  draw (ctx) {
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

    this.pos = [this.pos[0] + this.speed, this.pos[1]];
    console.log(this.pos);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = ScrollingObject;
