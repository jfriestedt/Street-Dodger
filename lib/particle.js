class Particle {
  constructor (game) {
    this.game = game;
    this.pos = [170, 240];
    this.direction = [
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ];
    this.size = Particle.SIZES[
      Math.floor(Math.random() * Particle.SIZES.length)
    ];
    this.opacity = 1;
    this.RGBS = [
      `150,186,180`,
      `126,130,249`,
      `13,141,255`
    ];
    // red,  blue, yellow
    this.rgbs = this.RGBS[
      Math.floor(Math.random() * this.RGBS.length)
    ];
    this.opacity = 1;
  }

  move () {
    this.pos[0] += 6 * this.direction[0];
    this.pos[1] += 6 * this.direction[1];
  }

  draw (ctx) {
    this.opacity -= 0.05;
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    ctx.fillStyle = `rgba(${this.rgbs},${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }
}

Particle.SIZES = [[1, 1], [7, 7], [5, 5], [3, 3]];

module.exports = Particle;
